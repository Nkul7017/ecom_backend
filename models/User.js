import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema=new mongoose.Schema({
username:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
role:{type:String,enum:['user','admin'],default:'user'},
address:{type:[mongoose.Schema.Types.Mixed]},
resetPasswordToken: {type: String, default:''}
},{timestamps:true})

UserSchema.pre("validate",async function(next){
    if(this.isModified("password"))
{
    this.password=await bcrypt.hash(this.password,10);
}
next();
})

export default mongoose.model('User',UserSchema);