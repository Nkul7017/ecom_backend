import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    price:{type:Number,required:true,min:[1,'wrong min price']},
    color:{type:[mongoose.Schema.Types.Mixed]},
    sizes:{ type : [mongoose.Schema.Types.Mixed]},
    discountPercentage:{type:Number,min:[1,'wrong min discount'],max:[99,'wrong max discount'],default:0},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
    stock: { type: Number, min:[0, 'wrong min stock'], default:0},
    brand: { type : String, required: true},
    category: { type : String, required: true},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    highlights:{ type : [String] },
    discountPrice: { type: Number,required:true},
    deleted: { type : Boolean, default: false},
})

export default mongoose.model('Product',ProductSchema)
