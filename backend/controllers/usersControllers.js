import User from "../models/users";

export const newUser = async (req, res, next) =>{
    const user = await User.create(req.body);
    res.status(200).json({
        user,
    });
}