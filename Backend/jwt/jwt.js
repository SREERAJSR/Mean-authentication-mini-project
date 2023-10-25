const jwt = require('jsonwebtoken')


module.exports ={
    generateUserToken:(userDetails)=>{
console.log(userDetails);
        const payload={
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            email:userDetails.email,
            _id:userDetails._id,
            filename:userDetails.filename
        }
        const options={
            expiresIn:86400
        }
        return jwt.sign(payload,process.env.SECRET_KEY,options)
    },
    getUserFromToken:(req)=>{
        const authHeader = req.headers.authorization;
if(!authHeader){
    return "Authorization header not found"
}
const token = authHeader.split(' ').pop()

try{
const decoded = jwt.verify(token,process.env.SECRET_KEY)
req.user =decoded
return req.user
}catch(error){
return "invalid token"
}

    }
}