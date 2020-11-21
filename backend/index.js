const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Users = require('./model/user');
const Product = require('./model/product');


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.get('/',(req,res,next)=>{
    res.status(200).json({status:true});
});

app.post('/login',async (req,res,next)=>{
    try{
        
        const username = req.body.username;
        const password = req.body.password;
        const user = await Users.findOne({username:username});
        
        if(!user){
            next({code:404,msg:'User not found!'});
        }else{
            const token = await jwt.sign({id:user._id,name:user.username},'techprime');
            res.status(200).json({status:true,token:token,name:username});
        }
    }catch(err){
        
        next({code:505,msg:err});
    }
});

app.get('/getproduct',async(req,res,next)=>{
    const products = await Product.find();
    console.log(products);
    res.status(200).json({status:true,data:products});
});

app.post('/addproduct',async (req,res,next)=>{
    const productData = req.body;
    const product = new Product(productData);
    const result = await product.save();
    console.log(result)
    res.status(200).json({status:true,data:result});
});

app.use((err,req,res,next)=>{
    let code = err.code;
    let msg = err.msg;
    res.status(code).json({status:false,msg:msg});
});


mongoose
  .connect(
    'mongodb+srv://root:root@cluster0.nk8bs.mongodb.net/techprime?retryWrites=true&w=majority',
    {useNewUrlParser: true,useUnifiedTopology: true} 
  )
  .then(result => {

    const PORT = 8080;
	app.listen(PORT, () => {
	    console.log(`Running on :  ${ PORT }`);
	});
  })
  .catch(err => {
        console.log("error");
});