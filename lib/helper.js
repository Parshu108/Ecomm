// helper/mailer.js
import crypto from "crypto";
import User from "../model/user";
import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = crypto.randomBytes(32).toString("hex");

    let updatedUser;
    if (emailType === "VERIFY") {
      updatedUser = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      updatedUser = await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    if (!updatedUser) {
      throw new Error("User not found");
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const verifyUrl = `${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${hashedToken}`;

    const mailOptions = {
      from: "prashuramsahanivictory@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
      html: `<p>Click <a href="${verifyUrl}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
