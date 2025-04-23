// "use server";

// import { Resend } from "resend";
// import { z } from "zod";

// // Initialize Resend with your API key
// // This will use the environment variable RESEND_API_KEY
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Email form schema
// const formSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   message: z
//     .string()
//     .min(10, { message: "Message must be at least 10 characters." }),
// });

// // Type for the form data
// export type EmailFormData = z.infer<typeof formSchema>;

// export async function sendEmail(formData: EmailFormData) {
//   try {
//     // Validate the form data
//     const validatedData = formSchema.parse(formData);

//     // Send email using Resend
//     const { data, error } = await resend.emails.send({
//       from: `Portfolio Contact <onboarding@resend.dev>`, // You can customize this once verified
//       to: ["ajjugiri14@gmail.com"], // Your email address
//       subject: `Portfolio Contact: Message from ${validatedData.name}`,
//       reply_to: validatedData.email,
//       text: `
// Name: ${validatedData.name}
// Email: ${validatedData.email}
// Message:
// ${validatedData.message}
//       `,
//       // You can also use HTML for a nicer email
//       html: `
// <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//   <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
//   <p><strong>Name:</strong> ${validatedData.name}</p>
//   <p><strong>Email:</strong> ${validatedData.email}</p>
//   <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #7c3aed;">
//     <p><strong>Message:</strong></p>
//     <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
//   </div>
//   <p style="margin-top: 20px; font-size: 12px; color: #666;">This email was sent from your portfolio contact form.</p>
// </div>
//       `,
//     });

//     if (error) {
//       console.error("Error sending email with Resend:", error);
//       return { success: false, message: error.message };
//     }

//     return { success: true, message: "Email sent successfully!" };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "An unknown error occurred",
//     };
//   }
// }
