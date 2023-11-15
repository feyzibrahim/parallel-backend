const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
  },
  { timestamps: true }
);

// Static Signup Method

userSchema.statics.signup = async function (username, password, package) {
  // Validation
  if (!username || !password) {
    throw Error("All Fields must be filled");
  }

  // Checking for duplicate usernames
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("username already in use");
  }

  //   Adding Salt
  const salt = await bcrypt.genSalt(10);
  //   Hashing the password
  const hash = await bcrypt.hash(password, salt);

  const type = "user";

  //   Creating the user in DB
  const user = await this.create({
    username,
    password: hash,
    userType: type,
    package,
  });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("This username is not registered. Please check!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
