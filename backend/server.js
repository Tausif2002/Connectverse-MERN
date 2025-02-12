const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
const authRoutes = require('./routes/auth')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


//rate limiting to protect against brute force attacks.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: { message: "Too many requests from this IP, please try again later." },
    headers: true,
});
  
app.use(limiter);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));