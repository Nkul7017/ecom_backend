import mongoose from "mongoose";

const CartSchema=mongoose.Schema({
quantity:{type:Number,required:true},
product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
size:{type:String},
color:{type:String}
})

export default mongoose.model('Cart',CartSchema);