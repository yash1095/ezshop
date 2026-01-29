import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'ezshop080@gmail.com',
    pass: process.env.EMAIL_PASS || 'ugemlwvqisamlgoo',
  },
});

export const sendOtpEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor((Math.random() + 1) * 1000);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'ezshop080@gmail.com',
      to: email,
      subject: 'Registration OTP',
      text: `${otp} is your EZShop OTP. Don't share it with anyone.`,
    });

    res.status(200).json({ message: 'OTP sent!', otp });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};
