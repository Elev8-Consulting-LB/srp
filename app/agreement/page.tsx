"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "@/hooks/use-toast";
import { sendAgreementEmail } from "@/actions/sendAgreementEmail";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  cv: z
    .any()
    .refine((files) => files?.length > 0, "CV is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf, .doc, .docx formats are supported."
    ),
});

const TermsAndConditions = () => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      terms: false,
    },
  });

  const isAgreed = form.watch("terms");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("terms", values.terms.toString());
    if (file) {
      formData.append("cv", file);
    }

    const result = await sendAgreementEmail(formData);

    if (result.success) {
      toast({
        title: "Agreement Submitted",
        description: "Your agreement and CV have been successfully submitted.",
      });
    } else {
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your agreement. Please try again.",
        variant: "destructive",
      });
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-[#003366] text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl font-bold mb-8"
            variants={itemVariants}
          >
            Candidate Agreement
            <br />
            Terms and Conditions
          </motion.h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div className="space-y-8" variants={containerVariants}>
                {/* Introduction */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <p className="text-sm leading-relaxed text-justify">
                    Supreme Recruitment Partners (Recruiter) is a professional
                    recruitment service contracted by its clients to seek,
                    prescreen, and refer candidates (Candidate) to its clients
                    (Client).
                  </p>
                  <p className="text-sm leading-relaxed text-justify">
                    Candidate has submitted an application or contacted the
                    Recruiter requesting support in job placement as a
                    Candidate.
                  </p>
                </motion.div>

                {/* Services Provided */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-justify">
                    SERVICES PROVIDED
                  </h2>
                  <ol className="list-decimal list-inside space-y-2">
                    <li className="text-sm leading-relaxed text-justify">
                      The Recruiter will review the Candidate&apos;s full and
                      accurate application. If appropriate, the Recruiter will
                      interview the Candidate for prescreening purposes. The
                      Recruiter will decide in its sole discretion whether a
                      candidate is suitable for placement with potential Clients
                      based on a combination of all provided information. Also,
                      the Recruiter will conduct reference check,
                      qualifications, past employment verification, and any
                      other verifications required by the Client.
                    </li>
                  </ol>
                </motion.div>

                {/* Candidate Responsibilities */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-justify">
                    CANDIDATE RESPONSIBILITES
                  </h2>
                  <ol className="list-decimal list-inside space-y-2 text-justify">
                    <span className="text-sm leading-relaxed text-justify">
                      1. Candidate shall provide accurate and necessary
                      information for Recruiter to conduct prescreening.
                      Candidate acknowledges that all references submitted may
                      be contacted by Recruiter or Client. Candidate shall
                      attend to all confirmed interviews. Candidate consents to
                      the disclosure of all relevant information by Recruiter to
                      the Client. Candidate should not engage in any conduct
                      which is harmful to the interests of the Recruiter. Upon
                      receiving an offer of employment, Candidate shall
                      immediately inform Recruiter. Candidate voluntarily
                      relinquishes their legal ability to pursue litigation
                      against Recruiter.
                    </span>
                  </ol>
                </motion.div>

                {/* No Obligation Policy */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-justify">
                    NO OBLIGATION POLICY
                  </h2>
                  <ol className="list-decimal list-inside space-y-2" start={3}>
                    <span className="text-sm leading-relaxed text-justify">
                      2. Candidate acknowledges and agrees that despite
                      Recruiter&apos;s best efforts to place Candidate with a
                      Client, there is no obligation that employment will be
                      obtained for Candidate. Candidate understands that
                      decisive employment is solely based on the Client&apos;s
                      decision.
                    </span>
                  </ol>
                </motion.div>

                {/* Relationship of Parties */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-justify">
                    Relationship of Parties
                  </h2>
                  <ol className="list-decimal list-inside space-y-2" start={4}>
                    <li className="text-sm leading-relaxed text-justify">
                      Nothing in these Terms and Conditions shall create, or be
                      deemed to create, a partnership between the parties.
                    </li>
                  </ol>
                </motion.div>

                {/* Personal Information Fields */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-justify">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="bg-white text-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="bg-white text-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                            className="bg-white text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Agreement Checkbox */}
                <motion.div className="space-y-4 pt-8" variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you acknowledge that you have
                            read, understood, and agree to abide by the terms
                            and conditions outlined in this Candidate Agreement.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* CV Upload */}
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submit Your CV</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                setFile(files[0]);
                                field.onChange(files);
                              }
                            }}
                            className="pb-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#002B5B] file:text-white hover:file:bg-[#002B5B]/80"
                          />
                        </FormControl>
                        <FormDescription>
                          Accepted formats: PDF, DOC, DOCX. Maximum file size:
                          5MB
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full" disabled={!isAgreed}>
                    Submit Agreement and CV
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
