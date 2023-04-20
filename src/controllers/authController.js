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