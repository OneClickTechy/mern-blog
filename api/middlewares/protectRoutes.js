import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
const protectRoutes = async (req, res, next) => {
    try {
        const { access_token } = req.cookies;
        
        if(!access_token){
            return next(errorHandler(401, "You are not logged in"));
        }
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        if(!decoded){
            return next(errorHandler(400, "Invalid token"));
        }
        
        const user = await User.findById(decoded.userId).select("-password");
    
        if(!user){
            return next(errorHandler(404, "User does not exist"));
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
export default protectRoutes