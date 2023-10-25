const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan =require('morgan')
const cors = require('cors')
const userRoutes = require('./routes/user-routes')
const adminRoutes = require('./routes/admin-router')
const multer = require('multer')
const path = require('path')
require('dotenv').config();
const port =3000
app.use(morgan('dev'))

app.use(cors({
    origin:'http://localhost:4200'
}
))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.listen(port,(err)=>{
    if(!err){
        console.log('Server connected succesfully');
    }else{
        console.log('server conncetion problem ',err);
    }
})

mongoose.connect('mongodb://localhost:27017/MeanAuthentication').then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('database conncection error'+err);
})
app.use(express.json()) 

app.use(userRoutes)
app.use('/admin',adminRoutes)

module.exports =app