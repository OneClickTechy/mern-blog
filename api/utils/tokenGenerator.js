import jwt from "jsonwebtoken";

export const generateToken = (res, userId, isAdmin) => {
  try {
    if(!process.env.JWT_SECRET){
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET,{
      expiresIn: "1d",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};
