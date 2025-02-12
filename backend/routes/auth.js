const express = require('express')
const{ register, verifyEmail, login, resendVerificationMail, fo, forgotPassword, resetPassword, upload, profile } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');


const authRoutes = express.Router()

authRoutes.post('/register',upload.single('profilePicture'), register)
authRoutes.post('/verify-email', verifyEmail)
authRoutes.post('/login', login)
authRoutes.post('/resend-verification-email', resendVerificationMail)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post('/reset-password', resetPassword)
authRoutes.get('/profile',authMiddleware, profile)

module.exports = authRoutes;