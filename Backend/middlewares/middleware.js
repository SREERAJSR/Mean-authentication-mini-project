const jwt = require('jsonwebtoken')
const multer = require('multer')
const path =require('path')
module.exports ={

    authMiddleWare:(req,res,next)=>{
        try {
            let authHeader = req.headers.authorization
            if(authHeader===undefined){
                res.status(401).send({error:'no token provided'})
            }
            let token = authHeader.split(" ").pop()
            jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
                if(err){
                    res.status(500).send({error:'Authentication failed'})
                }else{
                    console.log(decoded);
                    next()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}