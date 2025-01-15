"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  businessName: z.string().min(2).max(50),
  email: z.string().email(),
  telephone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  timeToCall: z.string(),
  jobSector: z.string(),
  location: z.string(),
  cv: z.instanceof(Blob).optional(),
});

export async function sendEmail(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    businessName: formData.get("businessName"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    timeToCall: formData.get("timeToCall"),
    jobSector: formData.get("jobSector"),
    location: formData.get("location"),
    cv: formData.get("cv"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  const {
    firstName,
    lastName,
    businessName,
    email,
    telephone,
    timeToCall,
    jobSector,
    location,
    cv,
  } = validatedFields.data;

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
      from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Contact Form Submission",
      text: `
        Name: ${firstName} ${lastName}
        Business Name: ${businessName}
        Email: ${email}
        Telephone: ${telephone}
        Preferred Time to Call: ${timeToCall}
        Job Sector: ${jobSector}
        Location: ${location}
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
    console.error("Failed to send email:", error);
    return { error: "Failed to send email" };
  }
}
