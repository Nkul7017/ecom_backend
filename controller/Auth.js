import User from "../models/User.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer'

export const Signup=async(req,res)=>{
    const {email,username,password}=req.body;
    try {
      const emailexist=await User.findOne({email});
      if(emailexist)
      {
       return  res.status(400).json({message:"Email Already exist"});
      }
      await User.create({
        username,
        email,
        password
      })
  return  res.status(201).json({message:"Signed Up Successfully"});
    } catch (e) {
        res.status(500).json({message:"server error"})
        console.log(e);
    }
}

export const Login=async(req,res)=>{
    const {email,password}=req.body;
    try {
    const exist=await User.findOne({email})
    if(!exist)
    return res.status(400).json({message:"Email not exist"})
    bcrypt.compare(password,exist.password,function(err,result){
        if(result)
        {
            const token=jwt.sign({_id:exist?._id},process.env.SECRET_KEY)
            res.status(200).json({token:token})
        }
        else{
            res.status(400).json({message:"invalid credentials"})
        }
    })
    } 
    catch (error) {
        res.status(500).json({message:"server error"})
    } 
}

export const forget=async(req,res)=>{
    const {email}=req.body;
    try {
        const res1=await User.findOne({email})
        if(!res1)
        return res.status(400).json({message:"email not exist"})
        const token = jwt.sign({_id: res1._id},process.env.SECRET_KEY, {expiresIn: "10m"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nakult824@gmail.com',
                pass: "thnrplgyoipdnqsf"
              }
          });
          
          var mailOptions = {
            from: 'nakult824@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            // text: `https://shivaay-shakti-yog.vercel.app/reset_password/${res1._id}/${token}`
            text: `http://localhost:5173/reset/${token}`
          };
          
          transporter.sendMail(mailOptions,async function(error, info){
            if (error) {
              console.log(error);
            } else {
                res1.resetPasswordToken=token;
                await res1.save();
              return res.status(200).json({message: "Success"})
            }
          })
    } catch (error) {
         res.status(500).json({message:"Internal Server Error"})
    }
}

export const reset=async(req,res)=>{
    const {password,token}=req.body;
    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        if(!decode)
        return res.status(400).json({message:"invalid token"})
        const result=await User.findOne({_id:decode._id})
        if(!result)
        return res.status(400).json({message:"user not found"})
        if(result?.resetPasswordToken===token)
        {
            result.password=password;
            result.resetPasswordToken = undefined;
            await result.save();
            return res.status(200).json({message:"Password Reset Successfully"})
        }
        else return res.status(400).json({message:"token expired"})
    } catch (e) {
         res.status(500).json({message:"Server Error"})
    }
}