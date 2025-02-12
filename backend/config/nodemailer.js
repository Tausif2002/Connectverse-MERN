const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tausif913673@gmail.com',
      pass: 'vvnoogurpakmailf'
    }
  })


  // Function to send verification email
const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email for Connectverse',
    html: `
      <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>If you did not sign up for Connectverse, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};


// Function to send reset password email
const sendResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password',
    html: `
      <p>Reset Your Password using below link, it will be valid for 1 hour:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not try resetting, please ignore.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent successfully');
  } catch (error) {
    console.error('Error sending Reset email:', error);
  }
};

  module.exports = { sendVerificationEmail, sendResetEmail }