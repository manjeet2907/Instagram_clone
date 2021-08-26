const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv= require('dotenv');
const requireLogin= require('../middleware/requireLogin')

// const nodemailer =require('nodemailer')
// const sendgridTransport =require('nodemailer-sendgrid-transport')

dotenv.config({path:'../config.env'});
// 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


const JWT_SECRET =process.env.JWT_SECRET;
// const transporter =nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:'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'
//     }
// }))

router.post('/signup', (req,res)=>{
    const {name, email, password,pic}=req.body;
    if(!email || !password || !name){
       return res.status(422).json({error: "please add all the fields"});
    }
    User.findOne({email:email}).then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:'user Already exist with this email id Login instead'});
            }
            bcrypt.hash(password,12)
            .then(hashedPassword =>{
                const user =new User({
                    name,
                    email,
                    password:hashedPassword,
                    pic
                })
                user.save().then(user =>{
                    res.json({message:'user Created Successfully'})
                })
                .catch(err=>{
                    console.log(err);
                })

            })
        })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin', (req, res)=> {
    const {email, password}=req.body;
    if(!email || !password){
       return res.status(422).json({error: "please enter valid credentials"});
    }
    User.findOne({email:email}).then((savedUser)=>{
            if(!savedUser){
                return res.status(422).json({error:"user doesn't exist with this email id "});
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch =>{
                    if(doMatch){
                        // res.json({message:"Logged In"})
                        const token = jwt.sign({_id:savedUser._id}, JWT_SECRET);
                        const {_id,name,email,followers,following,pic}= savedUser;
                        res.json({token:token, user:{_id,name,email,followers,following,pic}})
                    }else{
                        return res.status(422).json({error:"Wrong Password or Email id"});
                    }
                })
                .catch(err=>{
                    console.log(err);
                })

            })
})
    
module.exports = router;