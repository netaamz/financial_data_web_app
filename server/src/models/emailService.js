import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set to true if using SSL/TLS
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendEmail = async (name,to, subject, text) => {
    const mailOptions = {
        from: '"Crypto Data App" <Crypto@cryptodata.com>',
        to,
        subject: subject + Date.now(),
        text: text ,
        html: `<p><b>Hello ${name},</b><p>we recived your massage: <p>${text}</p></p><p>Thanks for contacting us, we received your inquiry in will contact you any time soon!</p><footer>
  <p>Best regards, Crypto Data app</p>
  <p><a href="mailto:${process.env.SMTP_MAIL}">contact via mail</a></p>
</footer>`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
};

export default sendEmail;
