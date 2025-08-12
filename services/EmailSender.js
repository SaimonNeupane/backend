import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});
async function sendMail(volunteerData) {
  const { name, email, age, inspiration, type } = volunteerData;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f4f8f4; padding: 20px; border-radius: 10px; border: 1px solid #d4e5d4;">
      ${
        type == "volunteer"
          ? '<h2 style="color: #2e7d32; text-align: center;">🌿 New Volunteer Request - Climate Care Network</h2>'
          : '<h2 style="color: #2e7d32; text-align: center;">🕴🏻 New member is trying to contact - Climate Care Network</h2>'
      }
        ${
          type === "volunteer"
            ? '<p style="font-size: 16px; color: #333;">A new user has shown interest in volunteering. Here are their details:</p>'
            : '<p style="font-size: 16px; color: #333;">A new user is trying to contact. Here are their details:</p>'
        } 
      
      <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #2e7d32;">Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr style="background-color: #eaf4ea;">
          <td style="padding: 8px; font-weight: bold; color: #2e7d32;">Email:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #2e7d32;">Age:</td>
          <td style="padding: 8px;">${age}</td>
        </tr>
        <tr style="background-color: #eaf4ea;">
          <td style="padding: 8px; font-weight: bold; color: #2e7d32;">${type}:</td>
          <td style="padding: 8px;">${inspiration}</td>
        </tr>
      </table>

      <p style="margin-top: 30px; font-size: 14px; color: #777;">
        This request was submitted via the Climate Care Network website.
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"CCN Volunteer Form" <${process.env.GMAIL_USER}>`,
    to: "climatecarenetwork@gmail.com",
    subject:
      type == "volunteer"
        ? "🌍 New Volunteer Request - CCN"
        : "New Message from a member",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending mail:", err);
    return;
  }
}

export default sendMail;
