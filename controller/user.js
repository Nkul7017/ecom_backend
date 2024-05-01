import jwt from "jsonwebtoken";
import User from '../models/User.js'

export const getuserdetails=async(req,res)=>{
    // console.log(req.body)
    const {token}=req.body;
try {
    const decode=jwt.verify(token,process.env.SECRET_KEY)
    if(!decode)
    {
        return res.status(400).json({message:"invalid token"})
    }
    const user=await User.findById({_id:decode?._id});
    if(!user)
    return res.status(400).json({message:"user not exist"})
     return res.status(200).json({_id:user._id,username:user.username,address:user.address,email:user.email,role:user.role})
} catch (error) {
     res.status(500).json({message:"server error"});
}
}

export const updateUserDetails=async(req,res)=>{
    console.log(req.body)
    const {_id}=req.params;
    try {
        const user= await User.findByIdAndUpdate(_id,req.body,{new:true})
        if(user)
        return res.status(200).json({_id:user._id,username:user.username,address:user.address,email:user.email,role:user.role});
    else res.status(400).json({message:"user not found"});
    } catch (error) {
        res.status(500).json({message:"server error"})
    }

}