import User from "../models/userschema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
    try{
  const {firstname,lastname, email, password}=req.body//takes data from user

  if(!firstname)return res.status(400).send({message:"please provide name"})//checks if the user has not filled any of the info lastname is not compulsory
    if(!email)return res.status(400).send({message:"please provide email"})
        if(!password)return res.status(400).send({message:"please provide password"})

   let existUser=await User.findOne({email})//checks if the user is already registered
   if(existUser) return res.status(400).send({message:"user already registered"});
   
   let hashedPassword= await bcrypt.hash(password,10);//password,no. of salt//converts the plain text password into hashed 
//    console.log(hashedPassword)
    let newUser=await User.create({firstname ,lastname, email ,password:hashedPassword});
    res.status(201).send({message:"user created successfully",newUser: newUser})
    }catch(err){
        console.log(err)
    }
  
}

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  //  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //    console.log(emailRegex)
  //  if (!emailRegex.test(email))  return res.status(400).send({ message: "Invalid email format" })
  //      let passwordRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$/
  //  if(!passwordRegex.test(password)) return res.status(400).send({message:"invalid password"})

  if (!email) return res.status(400).send({ message: "please provide email" });
  if (!password) return res.status(400).send({ message: "please provide password" });

  let existUser = await User.findOne({ email });
  if (!existUser) return res.status(404).send({ message: "please register first" });

  const compare = await bcrypt.compare(password, existUser.password);
  if (!compare) return res.status(400).send({ message: "invalid password" });

  
  let payload = {//  payload stores id and email
    userId: existUser._id,
    email: email
  };

  
  let token = await jwt.sign(payload, process.env.JWT_SECRET);// to generate token

  
  res.status(200).send({//will send login message and token 
    message: "login successful and token generated",
    token: token,
    user: existUser
  });
};



       

