const bcrypt = require('bcrypt')
const User = require('../models/user-model')
const mongoose = require('mongoose')

module.exports={

    signUpProcess: (userDetails)=>{
      
            return new Promise((resolve,reject)=>{
                try {
                const {firstName,lastName,email, password } = userDetails
                bcrypt.hash(password,10,async(err,hash)=>{
    
                    const newUser = new User({
                        firstName:firstName,
                        lastName:lastName,
                        email:email,
                        password:hash
                    })
                    await newUser.save().then((user)=>{
                        console.log('succesfully added user to databaser');
                        resolve(user)
                    }).catch((err)=>{
                        console.log("error adding user to database",err);
                        reject(err)
                    })
                })          
        } catch (error) {
            reject(error)
            
        }
    })
},


loginProcess: (userDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = userDetails;

            const userExist = await User.findOne({ email: email });

            if (!userExist) {
                // User doesn't exist
                reject(false);
            } else {
                bcrypt.compare(password, userExist.password, (error, success) => {
                    if (error) {
                        reject({status:false,user:null});
                    } else if (success) {
                        // Passwords match, login successful
                        resolve({status:true,
                        user:userExist});
                    } else {
                        // Passwords don't match, login failed
                        reject({status:false,user:null});
                    }
                });
            }
        } catch (error) {
            // Handle other errors (e.g., database query error)
            reject(false);
        }
    });
},

edit:(userDetails,filename)=>{
    return new Promise(async(resolve,reject)=>{
        try {
     const{firstName,lastName,email,password,renteredPassword} =userDetails

           const user =await User.findOne({email:email})
           if(password){
            bcrypt.compare(password,user.password).then(async(status)=>{
                console.log(status);
                if(status){
                 const newHashedPassword  = await bcrypt.hash(renteredPassword,10)
                   await User.updateOne(
                    { _id: user._id },
                    {
                      firstName: firstName,
                      lastName: lastName,
                      password: newHashedPassword,
                      filename:filename
                    }
                  )
                 const updateUser = await User.findById({_id:user._id})
                  resolve({firstName:updateUser.firstName,lastName:updateUser.lastName,email:updateUser.email,_id:updateUser._id,filename:updateUser.filename})
                }else{
                    resolve('wrong password')

                }
            })
           }
           
        } catch (error) {
            console.log(error);
           resolve(error) 
        }
    })

}

}