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
import { Globe, Mail, MapPin, Phone } from "lucide-react";

const jobSectors = [
    "Construction",
    "EPC Contractors",
    "Facility Management",
    "Manufacturing",
    "Oil and Gas",
] as const;

const locations = [
    "Lebanon",
    "Bahrain",
    "Egypt",
    "Iraq",
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
                            className="text-3xl md:text-4xl font-bold text-customTextFont mb-8 text-center underline underline-offset-8 decoration-customSecondary"
                        >
                            Contact Us
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-xl font-semibold text-customTextFont mb-8 text-start"
                        >
                            Employers
                            <br />
                            <br />
                            In order to prescreen CVs as well as to ensure the suitability of
                            the potential candidate matching your requirements, email the job
                            description to:{" "}
                            <Link
                                href="mailto:clients@supremerecruitmentpartners.com"
                                className="hover:underline text-xl text-customSecondary md:text-xl"
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
                                {/* Form fields remain the same as before */}
                            </motion.form>
                        </Form>
                    </div>
                </div>
            </motion.section>

            {/* Job Hunters Section */}
            <motion.section className="bg-customTextFont py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="bg-customTextFont rounded-lg p-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.h3
                            className="text-2xl font-bold text-white mb-4 relative inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Job Hunters
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-red-500 mt-2"></span>
                        </motion.h3>
                        <motion.p
                            className="text-white mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Please click here to familiarize yourself with our{" "}
                            <Link
                                href="/agreement"
                                className="underline underline-offset-4 decoration-customSecondary"
                            >
                                candidate agreement
                            </Link>
                            <br />
                            By emailing your CV, you consent Supreme Recruitment Partners to
                            process your personal details in relation to potential work
                            vacancies.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                href="/agreement"
                                className="bg-white hover:bg-customSecondary text-customTextFont px-8 py-3 rounded-full text-lg transition-colors duration-300 inline-block"
                            >
                                Apply Now
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Contact Information Section */}
            <motion.section className="bg-customTextFont py-24 flex flex-col items-center justify-center">
                <div className="container mx-auto px-4 md:px-28">
                    <motion.div
                        className="bg-customTextFont rounded-lg p-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.h3
                            className="text-2xl font-bold text-white mb-4 relative inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Our Contact
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-red-500 mt-2"></span>
                        </motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center w-full align-middle mt-20 md:mx-32">
                            <ul className="space-y-4">
                                {/* Phone Number */}
                                <li className="flex items-center space-x-4 text-white text-lg hover:text-customSecondary transition-colors text-justify">
                                    <Link href="tel:+9613172799" passHref legacyBehavior>
                                        <a className="flex items-center space-x-4">
                                            <Phone className="w-6 h-6" />
                                            <span>+961 3 17 27 99</span>
                                        </a>
                                    </Link>
                                </li>
                                {/* Address */}
                                <li className="flex items-center space-x-4 text-white text-lg hover:text-customSecondary transition-colors text-justify">


                                            <MapPin className="w-6 h-6" />
                                            <span>
                  PO Box: 500 <br />
                  Batroun, Lebanon
                </span>

                                </li>
                            </ul>
                            <ul className="space-y-4">
                                {/* Email */}
                                <li className="flex items-center space-x-4 text-white text-lg hover:text-customSecondary transition-colors text-justify">
                                    <Link
                                        href="mailto:clients@supremerecruitmentpartners.com"
                                        passHref
                                        legacyBehavior
                                    >
                                        <a className="flex items-center space-x-4">
                                            <Mail className="w-6 h-6" />
                                            <span>clients@supremerecruitmentpartners.com</span>
                                        </a>
                                    </Link>
                                </li>
                                {/* Website */}
                                <li className="flex items-center space-x-4 text-white text-lg hover:text-customSecondary transition-colors text-justify">
                                    <Link
                                        href="https://www.supremerecruitmentpartner.com"
                                        passHref
                                        legacyBehavior
                                    >
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-4"
                                        >
                                            <Globe className="w-6 h-6" />
                                            <span>www.supremerecruitmentpartner.com</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </main>
    );
}