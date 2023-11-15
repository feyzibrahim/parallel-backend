const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Create JST Tokens
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

// Login Function
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const id = user._id;
    const token = createToken(id);

    const userName = user.userName;
    const userType = user.userType;

    res.status(200).json({ id, username, token, userName, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup function
const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    const token = createToken(user._id);

    const userType = user.userType;

    res.status(200).json({ username, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
