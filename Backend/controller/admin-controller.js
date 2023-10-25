const jwt = require('jsonwebtoken');
const{signUpProcess,loginProcess,edit} = require('../helpers/user-helpers');
const User = require('../models/user-model')
const {generateUserToken,getUserFromToken} = require('../jwt/jwt');
const { text } = require('express');
const { default: mongoose } = require('mongoose');

module.exports ={
    getAllUsers:async(req,res)=>{
        try {
            const users=await User.find()

            if(!users){
                console.log('no user');
                res.status(401).json({'message':'no user'})
            }
            res.status(200).json({users})
        } catch (error) {
            res.status(500).json({error})
            
        }

    },
    deleteUser:async(req,res)=>{

        try {
            const id = req.params.id
           await User.deleteOne({_id:id}).then((result)=>{

            if (result.deletedCount === 1) {
                console.log('Document deleted successfully.');
                res.status(200).json({'messge':"sucess"})
              } else {

                console.log('Document not found.');
              }

           })
        } catch (error) {
            console.log(error);
            
        }

    },
    getUserById:async(req,res)=>{

        try {
            const id =req.params.id
            const user =await User.findById(id)
            if(!user){
                res.status(401).json({message:'no user'})
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error})
        }

    },
    editUser: async (req, res) => {
        try {
          const { firstName, lastName, email } = req.body.userData;
          await User.updateOne({ email: email }, {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email:email
            },
          });
          res.status(200).json({message:'user updated succesfully'})
        } catch (error) {
          console.error(error);
          res.status(500).json({error:error});
        }
      }
}