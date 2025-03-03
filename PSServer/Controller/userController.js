

//register

const users = require("../Models/userSchema");
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    console.log("Inside register controller function");
    const {username,email,password}= req.body
    // console.log(`${username},${email},${password}`)
    try{
        const  existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("user already exist.... please login!!!")
    }
    else{
        const newUser = users({
            username,email,password,github:"",linkedin:"",profile:""
        })
        await newUser.save()
        res.status(200).json("register request recieved")
    }
    }

    catch(err){
      res.status(401).json(`Register API Failed, Error,:${err}`)
    }

}


/* res.status(200).json("register request recieved")*/


//Login

exports.login = async (req,res)=>{
    console.log("inside login function");
    const{email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"secret123")
            res.status(200).json({
                existingUser,token
            })
        }else{
            res.status(404).json("incorrect email/password")
        }


    }
    catch(err){
        res.status(401).json(`Login API Failed, Error,:${err}`)
      }
}

