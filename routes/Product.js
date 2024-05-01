import express from 'express'
import { CreateProducts, fetchAllProducts, fetchProductByID, updateProduct } from '../controller/Product.js'
const router=new express.Router()

router.post('/',CreateProducts)
.get('/',fetchAllProducts)
.get('/:_id',fetchProductByID)
.patch('/:id',updateProduct)

export default router;