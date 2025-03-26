import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({message:"Not authorized cos no token"})
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next() 
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}

//RBAC:Role base access control
export const authorize = (...roles)=>{
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Access Denied"})
        }
        next();
    }
}
