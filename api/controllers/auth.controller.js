import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password || !username.trim()==="" || !email.trim()==="" || !password.trim()===""){
        return next(errorHandler(400, "All fields are required"))
    };

    try {
        const isExist = await User.findOne({ email });
        
        if(isExist){
            return next(errorHandler(400, "User already exist"))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(200).json("User Created Successfully");
    } catch (error) {
        next(error)
    }
}