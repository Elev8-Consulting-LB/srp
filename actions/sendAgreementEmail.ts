"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const agreementFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  cv: z.instanceof(Blob).optional(),
});

export async function sendAgreementEmail(formData: FormData) {
  const validatedFields = agreementFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    terms: formData.get("terms") === "true",
    cv: formData.get("cv"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  const { firstName, lastName, email, terms, cv } = validatedFields.data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Candidate Agreement Submission",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Agreed to Terms and Conditions: ${terms ? "Yes" : "No"}
      `,
    };

    if (cv) {
      const cvBuffer = await cv.arrayBuffer();
      mailOptions.attachments = [
        {
          filename: "cv.pdf",
          content: Buffer.from(cvBuffer),
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Failed to send agreement email:", error);
    return { error: "Failed to send agreement email" };
  }
}
