import express from 'express'
import { AddtoCart, DeleteCart, FetchCart, UpdateCart } from '../controller/Cart.js';

const router=new express.Router();

router
.post('/',AddtoCart)
.get('/:user',FetchCart)
.patch('/:_id',UpdateCart)
.delete('/:_id',DeleteCart)

export default router