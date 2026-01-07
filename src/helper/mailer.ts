import User from "@/models/user";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      }
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // ❌
      port: 2525, // ❌
      auth: {
        user: "953d3090a29ed3", // ❌
        pass: "3c884e9c36de8d", // ❌
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email!" : "Reset your Password!",
      html: `${
        emailType === "VERIFY"
          ? `
            <p>
                Click  <a href="${
                  process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">here</a> ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            } or copy or paste the link above in your
                browser
                <br />
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>
            `
          : `
             <p>
                Click  <a href="${
                  process.env.DOMAIN
                }/resetpassword?token=${hashedToken}">here</a> ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            } or copy or paste the link above in your
                browser
                <br />
                ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>
            `
      }`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error("Error in sending Mail " + error);
  }
};
