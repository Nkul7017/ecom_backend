import express from 'express'
import { Signup, Login, forget, reset } from '../controller/Auth.js';
const router=express.Router();
router.post('/signup',Signup)
router.post('/login',Login)
router.post('/forget',forget)
router.post('/reset',reset)

export default router