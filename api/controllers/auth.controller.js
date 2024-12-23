import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/tokenGenerator.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  

  try {
    const isExist = await User.findOne({ email });

    if (isExist) {
      return next(errorHandler(400, "User already exist"));
    }
    let formatedUsername = username.toLowerCase();
      if((/\s+/g).test(formatedUsername)){
        formatedUsername = formatedUsername.replace(/\s+/g, '');
      }
      formatedUsername = formatedUsername + Math.random().toString(9).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: formatedUsername,
      email,
      password: hashedPassword,
      isAdmin: false,
    });
    await user.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const verifyUser = await User.findOne({ email });

    if (!verifyUser) {
      return next(errorHandler(400, "User does not exist"));
    }

    const matchPassword = await bcrypt.compare(password, verifyUser.password);

    if (!matchPassword) {
      return next(errorHandler(400, "Invalid email or password"));
    }
    generateToken(res, verifyUser._id, verifyUser.isAdmin);
    res.status(200).json({
      username: verifyUser.username,
      email: verifyUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { name, email, photoURL } = req.body;
  if (!name || !email || !photoURL || name.trim() === "" || email.trim() === "" || photoURL.trim() === "") {
    return next(errorHandler(400, "All fields are required")); 
  }
  

  try {
    const user = await User.findOne({ email });
    if(user){
      generateToken(res, user._id, user.isAdmin);
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      })
    } else {
      const password = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let username = name.toLowerCase();
      if((/\s+/g).test(username)){
        username = username.replace(/\s+/g, '');
      }
      username = username + Math.random().toString(9).slice(-8);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture: photoURL,
        isAdmin: false,
      });
      await newUser.save();
      generateToken(res, newUser._id, newUser.isAdmin);
      res.status(200).json({
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    }
  } catch (error) {
    next(error)
  }
  

}

export const signout = async (req, res, next) => {
try {
    res.clearCookie('access_token');
    res.status(200).json({ message: "Signout successfully" });
} catch (error) {
  next(error);
}
}




