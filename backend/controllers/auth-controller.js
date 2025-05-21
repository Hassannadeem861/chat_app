import dotenv from "dotenv";
dotenv.config();
import { Auth } from "../models/auth-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const register = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
      return res
        .status(403)
        .json({ message: "Name, email and password gender are required" });
    }

    const userEmail = await Auth.findOne({ email: email });

    if (userEmail) {
      return res.status(403).json({ message: "User email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const malePicture = `https://avatar.iran.liara.run/public/boy?name=${name}`;
    const femalePicture = `https://avatar.iran.liara.run/public/girl?name=${name}`;

    const userCreated = await Auth.create({
      name,
      email,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? malePicture : femalePicture,
    });

    return res
      .status(200)
      .json({ message: "Registration successfully", userCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registraction failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(403)
        .json({ message: "Email and password are required" });
    }

    const user = await Auth.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, gender: user.gender },
      process.env.JWT_SECRET
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // set only in production with HTTPS
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: `Successfully Logged In`, user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await Auth.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await Auth.countDocuments();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      users,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get all users", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const loginUser = req.id;
    const users = await Auth.find({ _id: { $ne: loginUser } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({
      message: "Get all Login user",
      users
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Get all user",
      error: error.message,
    });
  }
};

const getSingleAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).json({ message: "Id is required" });
    }

    const admin = await Auth.findById(id);

    if (!admin) {
      return res.status(500).json({ message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ message: "Fetched single admin successfully", admin });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get single admin", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide an email address" });
    }

    const admin = await Auth.findOne({ email: email.toLowerCase() });
    console.log("admin: ", admin);

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found. Please register first." });
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set up nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    // Prepare email details
    const mailOptions = {
      from: "saylanitechlimited@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Please click on the link to reset your password: ${process.env.SERVER_URL}/reset-password/${token}`,
    };

    console.log("mailOptions: ", mailOptions);

    // Send email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in forget password", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token.trim();
    console.log("token: ", token);
    // console.log("req.params: ", req.params);

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Please provide a new password." });
    }

    // if (password.length < 8) {
    //     return res.status(400).json({ message: "Password must be at least 8 characters long." });
    // }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken: ", decodedToken);

    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const admin = await Auth.findOne({ email: decodedToken.email }).select(
      "+password"
    );

    console.log("admin: ", admin);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;
    await admin.save();

    return res
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        message: "Token has expired. Please request a new password reset link.",
        error: error.message,
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        message: "Invalid token. Please request a new password reset link.",
        error: error.message,
      });
    }

    return res
      .status(500)
      .json({ message: "Error in reseting password", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const userId = req.params.id;
  console.log("userId: ", req.params);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const { currentPassword, newPassword } = req.body;
  console.log("userId: ", req.body);

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current password and new password are required" });
  }

  try {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "User does not have a password set" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update password", error: error.message });
  }
};

export {
  register,
  login,
  getAllUsers,
  getUser,
  getSingleAdmin,
  logout,
  forgetPassword,
  resetPassword,
  updatePassword,
};
