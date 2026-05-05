const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await userModel.findOne({
      $or: [{ email }, { fullName }],
    });

    if (userExist) {
      return res.status(401).json({
        message: "User already exist",
      });
    }

    const user = await userModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: "Unable to register user",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  register,
  login,
  logout,
};
