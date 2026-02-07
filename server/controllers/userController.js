import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token
}

export const register=async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({message:"Fill the required fields"})
        }

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User exists already"})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,email,password:hashedPassword
        })

        const token=generateToken(newUser._id);
        res.cookie("token",token);
        newUser.password=undefined

        return res.status(201).json({message:"User created successfully",user:newUser} )
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

export const login=async(req,res)=>{
    const {email, password}=req.body;

    try{
        if(!email || !password){
            return res.status(400).json({message:"Fill required fields"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Inavlid Credentials"})
        }

        const token = generateToken(user._id);
        res.cookie("token",token)
        user.password=undefined

        return res.status(201).json({message:"Logged In",  user:user})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

export const logout=(req,res)=>{
    try{
        res.cookie('token',"");
        res.json({message:"Logged Out"})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}


export const welcome=async(req,res)=>{
    try{
        const user=await User.findById(req.userId)
        return res.json({user})
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}