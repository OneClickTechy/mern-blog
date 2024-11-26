import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};
