const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { sendVerificationEmail, sendResetEmail } = require('../config/nodemailer');

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
let usernameRegex = /^[a-zA-Z0-9._]{3,16}$/ ; // regex for username


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
  });
  
exports.upload = multer({ storage });

exports.register = async (req, res)=>{
    console.log(req.body)
    let {email,username, password, name}=req.body;

    if(name && name.length<3){
        return res.status(403).json({"message":"Name must be atleat 3 letters long"})
    }

    if(!email.length){
        return res.status(403).json({"message":"Enter email"})
    }

    if(!emailRegex.test(email)){
        return res.status(403).json({"message":"email is invalid"})
    }

    if(!usernameRegex.test(username)){
        return res.status(403).json({"message":"Username must be 3-16 characters long and can only contain letters, numbers, '.' and '_'"})
    }

    if(!passwordRegex.test(password)){
        return res.status(403).json({"message":"passord should be 6 to 20 character with Uppercase, Lowercase and Digit"})
    }

    try{
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(409).json({success:false, message:"This Email already exists"})
        }

        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(409).json({success:false, message:"This Username already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ username, email, password: hashedPassword, name , profilePicture: req.file ? req.file.path : null,});
        await user.save();

         // Generate verification token
        const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send verification email
        const verificationLink = `https://connectverse-mern.vercel.app/verify-email?token=${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(201).json({ success:true, message: 'Signup successful! Please check your email to verify your account.' });

    }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message})
    }

}


exports.verifyEmail = async (req, res)=>{

    const { token } = req.body;
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find user
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(400).json({message: 'Invalid token' });
      }
  
      // Mark user as verified
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      res.status(400).json({message: 'Invalid or expired token' });
    }

}


exports.login = async (req, res)=>{

    const { email, password, rememberMe } = req.body;
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if email is verified
      if (!user.isVerified) {
        return res.status(400).json({ message: 'Please verify your email before logging in' });
      }

      // Generate a JWT token with an expiration time based on "Remember Me"
     const expiresIn = rememberMe ? '7d' : '1d'; // 7 days if "Remember Me" is checked, otherwise 1 day
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }

}

exports.resendVerificationMail = async (req, res)=>{

    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      if (user.isVerified) {
        return res.status(400).json({ error: 'Email already verified' });
      }
  
      // Generate new verification token
      const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send verification email
      const verificationLink = `https://connectverse-mern.vercel.app/verify-email?token=${verificationToken}`;
      await sendVerificationEmail(email, verificationLink);
  
      res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error resending verification email' });
    }

}

exports.forgotPassword = async (req, res)=>{

    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found with this Email' });
      // Generate reset token
      const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
      const resetLink  = `https://connectverse-mern.vercel.app/reset-password?token=${resetToken}`
      //send reset link
      await sendResetEmail(email, resetLink);
      res.status(200).json({ message: 'Paasword reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending Password reset link' });
    }
}

exports.resetPassword = async (req, res)=>{
    const { token, newPassword } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(400).json({ message: 'Invalid token' });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
}

exports.profile = async (req, res)=>{
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude the password field
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching profile.' });
      }
}



