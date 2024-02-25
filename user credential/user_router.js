import express, { response } from "express";
import User from "../user credential/user_model.js";
import bcrypt from "bcrypt";


const userRouter = express.Router();

//SIGNUP USER

userRouter.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  if(!name || !email || !username ||!password){
      return res.json({error:"Please fill all Fields"})
  }

const checkemail = await User.findOne({email});
if(checkemail){
    return res.json({error:"Email already register"})
}else{
    bcrypt.hash(password,12)
    .then((hashPassword)=>{
           if(!hashPassword){
            res.json({error:"Server Error"})
           }else{
               const newUser = new User({name:name,email:email,username:username,password:hashPassword});
            newUser.save()
            .then((response)=>{
            res.json({message:"User register successfully",response})
            })
            .catch((error)=>{
                console.log(error)
            })
           }
    })
    .catch((err)=>{
        console.log(err);
    })
}
});

//LOGIN USER

    userRouter.post("/login",async(req,res)=>{
        const {email,password} = req.body;

        if(!email || !password){
            return res.json({error:"Please fill all fields"})
        }

        try {
            const checkEmail = await User.findOne({email})
            if(!checkEmail){
               return res.json({error:"Email is not register"})
            }
            else{
                const comparePassword =await bcrypt.compare(password, checkEmail.password)
                if(comparePassword){
                    const response = await checkEmail.save();
                    return res.json({message:"Login Successfully", response})
                }else{
                    return res.json({ error: "Password is incorrect" });
                }
            } 
        } catch (error) {
            console.log(error);
        }
    })

    



export default userRouter;
