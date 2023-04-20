const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    })
  }catch (err){
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email , password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id},
      process.env.JWT_SECRET || "secret"
    );
    res.json({ success: true, token });
  }catch (err){
    next(err);
  }
};

module.exports = {
  register,
  login,
};