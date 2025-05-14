
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.registernewuser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    // Save user to database
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newuser = await new userModel({
      username,
      email,
      password: hashedPassword,
    });
  
    await newuser.save();
    const payload = { email: newuser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.signupuser = async(req, res ,next)=>{
    try {
        const { email, password } = req.body;
    
        // Validate email and password
        if (!email || !password) {
          return res.status(400).json({ message: "Please provide all required fields." });
        }
    
        // Find the user in the database
        const user = await userModel.findOne({ email: email });
    
        // Check if user exists
        if (!user) {
          return res.status(401).json({ message: "User Not Found" });
        }
    
        console.log(user);
        
        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
    
        // Generate JWT token
        const payload = { email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION || '1h', // Default to 1 hour if not set
        });
    
        // Send the token back to the client
        res.cookie('token', token, {
            httpOnly: true, // Makes sure the cookie is only accessible via HTTP(S)
            secure: process.env.NODE_ENV
          });
        return res.json({ token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
}


module.exports.logoutuser = async (req, res, next) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};