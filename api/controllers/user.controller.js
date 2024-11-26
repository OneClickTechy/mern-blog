import User from "../models/auth.model.js";
export const profile = async (req, res, next) => {
    try {
        const {_id}=req.user;
        console.log(_id)
        const user = await User.findById(_id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
   }