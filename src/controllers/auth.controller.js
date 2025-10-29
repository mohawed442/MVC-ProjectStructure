import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js';
import jwt from "jsonwebtoken";


export const login = async (req , res)=>{
    try {
        const  {email , password } = req.body  ;

        const user =await userModel.findOne({email})
        if (!user) {
            return res.status(404).json({message:"in-valid login Data"})
        }
        const match =await bcrypt.compare(password,user.password) ;
        if (!match) {
            return res.status(404).json({message:"in-valid login Data"})
        }
        if (!user.confirmEmail) {
            return res.status(403).json({ message: "Please confirm your email before proceeding" });
        }
        let token ;
        switch (user.role) {
            case "user":
                token = jwt.sign(  
                     { id: user._id }, 
                     process.env.JWT_SECRET,      
                     { expiresIn: "1h" }           
                     )
                break;
            case "admin":
                token = jwt.sign(  
                     { id: user._id }, 
                     process.env.JWT_SECRETADMIN,      
                     { expiresIn: "1h" }           
                     )
                break;
            default:
                return res.status(401).json({ message: "login role invalid" });
        }

        return res.status(200).json({message : "done" , token})

    } catch (error) {
        
         console.error("Signup error:", error);
        return res.status(500).json({message: 'Internal server error'});
    }
}
