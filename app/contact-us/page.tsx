"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";
import { sendEmail } from "@/actions/sendEmail";
import { useToast } from "@/hooks/use-toast";

const jobSectors = [
  "Construction",
  "EPC Contractors",
  "Facility Management",
  "Manufacturing",
  "Oil and Gas",
] as const;

const locations = [
  "Lebanon",
  "Jordan",
  "Kuwait",
  "Oman",
  "Qatar",
  "Saudi Arabia",
  "UAE",
] as const;

const timeSlots = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
] as const;

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  telephone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  timeToCall: z.string({
    required_error: "Please select a preferred time for call",
  }),
  jobSector: z.string({
    required_error: "Please select a job sector",
  }),
  location: z.string({
    required_error: "Please select a location",
  }),
  cv: z
    .custom<FileList>()
    .refine((files) => files.length > 0, "CV file is required")
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        ),
      "Only PDF and Word documents are allowed"
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      "File size should be less than 5MB"
    ),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.6,
      },
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      telephone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "cv") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    const result = await sendEmail(formData);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });
      form.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <main className="overflow-hidden">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-20 md:py-28 bg-gray-50"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-[#002B5B] mb-8 text-center underline underline-offset-8 decoration-customSecondary"
            >
              Contact Us
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-3xl md:text-xl font-semibold text-[#002B5B] mb-8 text-start"
            >
              Employers
              <br />
              <br />
              In order to prescreen CVs as well as to ensure the suitability of
              the potential candidate matching your requirements, email the job
              description to:{" "}
              <Link
                href="mailto:clients@supremerecruitmentpartners.com"
                className="hover:underline"
              >
                clients@supremerecruitmentpartners.com
              </Link>
            </motion.p>

            <Form {...form}>
              <motion.form
                variants={formVariants}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Business Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your business name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Telephone
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="timeToCall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Suitable time to call
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobSector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Job Sector
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job sector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jobSectors.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Location
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="cv"
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormLabel className="text-customPrimary">
                          Upload File
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                onChange(e.target.files);
                              }}
                              className="pb-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#002B5B] file:text-white hover:file:bg-[#002B5B]/80 cursor-pointer"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Accepted formats: PDF, DOC, DOCX. Maximum file size:
                          5MB
                        </FormDescription>
                        <FormMessage className="text-customSecondary" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="bg-transparent border-2 border-[#002B5B] text-[#002B5B] hover:bg-[#002B5B] hover:text-white rounded-full px-8 py-6 text-lg font-semibold transition-colors duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>
          </div>
        </div>
      </motion.section>
      <motion.section>
        <div className="bg-[#002B5B] px-8 py-24 rounded-lg mb-8">
          <motion.h3
            className="text-2xl font-bold text-white mb-4 text-center relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Job Hunters
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-red-500 mt-2"></span>
          </motion.h3>
          <motion.p
            className="text-white text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Please click here to familiarize yourself with our{" "}
            <Link
              href="/agreement"
              className="underline underline-offset-4 decoration-customSecondary"
            >
              candidate agreement
            </Link>
            <br />
            By emailing your CV you consent Supreme Recruitment Partners to
            process your personal details in relation to potential work
            vacancies.
          </motion.p>
          <motion.p
            className="text-white text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/agreement"
              className="bg-white hover:bg-customSecondary text-customPrimary px-8 py-3 rounded-full text-lg transition-colors duration-300"
            >
              Apply Now
            </Link>
          </motion.p>
        </div>
      </motion.section>
    </main>
  );
}
