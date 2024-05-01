import Product from "../models/Product.js"

export const CreateProducts=async(req,res)=>{
    try {
        const product=new Product(req.body);
        product.discountPrice=Math.round(product.price*(1-product.discountPercentage/100))
        const res1=await product.save();
        res.status(201).json(res1);
    } catch (e) {
        res.status(500).json({message:"server error"});
    }
    }

export const fetchAllProducts=async(req,res)=>{
try {
    let product=Product.find({});
    let total=Product.find({});

    if(req.query.category)
    {
        product=product.find({category:{$in:req.query.category.split(',')}});
        total=total.find({category:{$in:req.query.category.split(',')}});
    }
    if(req.query.brand)
    {
        
        product=product.find({brand:{$in:req.query.brand.split(',')}});
        total=total.find({brand:{$in:req.query.brand.split(',')}});
    }


    if(req.query._sort && req.query._order)
    {
        product=product.sort({[req.query._sort]:req.query._order})
    }

    if(req.query._page && req.query._limit)
    {
        product=product.skip(req.query._limit*(req.query._page-1)).limit(req.query._limit);
    }
    product=await product.exec();
    total=await total.count().exec();
    if(!product)
    {
    return res.status(400).json({message:"No products"});
    }
    else{
        return res.status(200).json({product:product,total:total});
    }
} catch (e) {
    console.log(e.message)
    return res.status(500).json({message:"server error"});
}
}


export const fetchProductByID=async(req,res)=>{
try {
    const {_id}=req.params;
    const exist=await Product.findById(_id);
    if(!exist){
        return res.status(400).json({message:"product not exist"})
    }
    else
    return res.status(200).json(exist);
} catch (e) {
    res.status(500).json({message:"server error"});
}
}

export const updateProduct=async(req,res)=>{
try {
     const {_id}=req.params;
     const product=await Product.findByIdAndUpdate(_id,req.body,{new:true});
     product.discountPrice=Math.round(product.price*(1-product.discountPercentage/100))
     const updated=await product.save();
     res.status(200).json(updated)
} catch (e) {
     res.status(500).json({message:"server error"})
}
}