import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type MailOptions = {
  email: string;
  subject: string;
  message: string;
};

const sendEmail = async (options: MailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as unknown as SMTPTransport.Options);

  const mailOptions = {
    from: `${process.env.STMP_FROM_NAME} < ${process.env.STMP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
