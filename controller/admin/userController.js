const User = require("../../models/userModel");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

// Create JST Tokens
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, package } = req.body;

    const user = await User.signup(username, password, package);

    const token = createToken(user._id);

    const userType = user.userType;

    return res.status(200).json({ username, token, userType, package });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  createUser,
};
