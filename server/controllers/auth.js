import User from "../models/user";
import { hashPassword, comparePasswords } from "../utils/auth";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name) return res.status(400).send("Name is required!");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and must be more than 6!");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.status(400).send("Email already taken");
    }
    //hashpassword
    const hashedPassword = await hashPassword(password);

    //register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("Saved user!", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error! Try again.");
  }
};

export const login = async(req,res)=>{
  try{
    // console.log(req.body);
    //check if db has user with that email

    const {email,password}=req.body
    const user= await User.findOne({email}).exec()
    if(!user) return res.status(400).send("No user found")

    //check password
    const match= await comparePasswords(password, user.password)

    //create signed jwt
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: "7d" })
    
    //return user and token to client, exclude hashed password
    user.password=undefined;
    //send token in cookie
    res.cookie("token",token,{
      httpOnly: true,
      //secure: true. //only works on https
    })
    //send user as json response
    res.json(user)

  }catch(err){
    console.log(err);
    return res.status(400).send("Error. Try again")

  }
}
