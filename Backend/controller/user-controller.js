const jwt = require('jsonwebtoken');
const{signUpProcess,loginProcess,edit} = require('../helpers/user-helpers');
const User = require('../models/user-model')
const {generateUserToken,getUserFromToken} = require('../jwt/jwt');
const { text } = require('express');
const { default: mongoose } = require('mongoose');

module.exports ={
    user_signUp:async(req,res)=>{   
        try {
            const{email} =req.body
            const userExist = await User.findOne({email:email})
            if(userExist){
                throw new Error('user exist')
            }
           signUpProcess(req.body).then((user)=>{
            res.status(200).json({"status":true,"user":user,"auth":true,"message":"user added successfully"})
           })
        
        } catch (error) {
            res.json({ status: false, error: error.message });
            
        }

    },
    user_Login:async(req,res)=>{
        try{
            console.log(req.body);
        const{email,password} = req.body
        loginProcess(req.body).then((result)=>{
            const {status,user} = result
            if(status){
                let token = generateUserToken(user)
                console.log(token);
                res.status(200).json({status:true,"message":"user login succesfully",user:user,token:token})
            }else{
                res.status(401).json({ status: false, message: 'User login failed' ,auth:false});
            } 
        }).catch((err)=>{
            res.status(500).json({ status: false, message: 'Internal server error'});
 
        })
        }catch(err){
            console.log(err);
            res.status(400).json({ status: false, message: 'Bad request', });


        }

    },getUserDetails:(req,res)=>{
        const user = getUserFromToken(req)
        res.status(200).json(user)
    },
    updateUser:async(req,res)=>{

        try {
            // const{firstName,lastName,email,password,renteredPassword} =req.body
        const filename =req.file.filename
         edit(req.body,filename).then((response)=>{
            const token = generateUserToken(response)
            res.status(200).json(token)
         })


            
        } catch (error) {
            res.status(500).json({error})
            
        }
        

        


    }
   
}