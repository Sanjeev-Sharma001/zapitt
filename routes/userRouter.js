const express=require("express");
const { signin, signup } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signin",signin)
userRouter.post("/signup",signup)


module.exports=userRouter