import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const profile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    next(error)``;
  }
};

export const updateProfile = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { username, email, password, profilePicture } = req.body;

  try {
    const updatedFields = {};
    const user = await User.findOne({ email });
    if (user && user._id.toString() !== userId) {
      return next(errorHandler(400, "You can only update your own profile"));
    }
    if (username) {
      const isUsernameExist = await User.findOne({ username });
      if (isUsernameExist) {
        return next(errorHandler(400, "Username already exist"));
      }
      if (username.length < 6 || username.length > 20) {
        return next(errorHandler(400, "username shoule between 6 and 20"));
      }
      const symspaceRegex = /[\s\W]+/g;
      if (symspaceRegex.test(username)) {
        return next(errorHandler(400, "symbols and space are not allowed"));
      }
      const upperRegex = /[A-Z]+/g;
      if (upperRegex.test(username)) {
        return next(errorHandler(400, "uppercase are not allowed"));
      }

      updatedFields.username = username;
    }
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return next(errorHandler(400, "Email already exist"));
      }
      if (!emailRegex.test(email)) {
        return next(errorHandler(400, "Invalid email format"));
      }
      updatedFields.email = email;
    }
    if (password) {
      if (password.length < 6 || password.length > 20) {
        return next(errorHandler(400, "password shoule between 6 and 20"));
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password = hashedPassword;
    }
    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updatedFields,
      { new: true }
    );
    res.status(200).json({
      _id: userId,
      username: updatedUser.username || user.username,
      email: updatedUser.email || user.email,
      profilePicture: updatedUser.profilePicture || user.profilePicture,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { _id: userId, isAdmin } = req.user;
    const {id}=req.params;
    if(!isAdmin && id!==userId.toString()){
        return next(errorHandler(400, "You can only delete your own account"));
    }
    await User.findByIdAndDelete(id);
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};



export const getUsersProfile = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sort = (req.query.sort === "asc" ? 1 : -1) || -1;
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: sort })
      .limit(limit)
      .skip(startIndex);
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: {
        $gte: oneMonthAgo,
      },
    })
    res.status(200).json({ users, totalUsers, lastMonthUsers });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if(!user){
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
}
