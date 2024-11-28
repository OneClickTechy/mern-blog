import jwt from "jsonwebtoken";

export const generateToken = (res, userId, isAdmin) => {
  try {
    const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET,{
      expiresIn: "1d",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};
