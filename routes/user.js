import express from "express";
import { getuserdetails, updateUserDetails } from "../controller/user.js";
const router=express.Router();

router.post('/fetchuser',getuserdetails)
router.put('/updateuser/:_id',updateUserDetails)

export default router;