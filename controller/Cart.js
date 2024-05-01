import Cart from "../models/Cart.js";

export const AddtoCart=async(req,res)=>{
    try {
        console.log(req.body)
        const obj=new Cart(req.body)
        const doc=await obj.save()
        const result=await doc.populate('product')
      
          return res.status(201).json(doc);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error"});  
    }
}

export const FetchCart=async(req,res)=>{
    try {
        const response=await Cart.find({user:req.params.user}).populate('product');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error"}); 
    }
}

export const UpdateCart=async(req,res)=>{
    const {_id}=req.params;
    console.log(_id)
    try {
        const response=await Cart.findByIdAndUpdate(_id,req.body)
        // .populate('product').
        // populate(
        //     {path:'user',select:'-password -resetPasswordToken'})
        return res.status(200).json({message:"updated"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error"}); 
    }
}

export const DeleteCart=async(req,res)=>{
    const {_id}=req.params;
    console.log(_id)
    try {
        const response=await Cart.findByIdAndDelete(_id)
        // .populate('product').
        // populate(
        //     {path:'user',select:'-password -resetPasswordToken'})
        return res.status(200).json({message:"deleted"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server Error"}); 
    }
}