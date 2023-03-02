const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY
const signup = async(req,res)=>{

    const {username,email,password} = req.body
    try{
      

        const existUser = await userModel.findOne({email:email})
        if(existUser){
            return res.status(400).json({message:"user already exist"})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email,
            password:hashPassword,
            username:username
        })

        const token = jwt.sign({email:result.email , id:result._id},SECRET_KEY);

        res.status(200).json({
            user:result,
            token:token
        })


    }catch(error){

        console.log(error)
        res.json({error:"something went wrong"})

    }

}
const signin = async (req,res)=>{

    const {email,password}=req.body

    try{
        const existUser = await userModel.findOne({email:email})
        if(!existUser){
            return res.json({message:"user not found please signin"})
        }
        const matchedpassword = await bcrypt.compare(password,existUser.password)

        if(!matchedpassword){
            return res.json({message:"wrong password"})
        }

        const token = jwt.sign({email:existUser.email , id:existUser._id},SECRET_KEY);

        res.status(200).json({
            user:existUser,
            token:token
        })


    }
    catch(error){
        console.log(error)
        res.json({error:"something went wrong"})


    }
    
}

module.exports={signin,signup}