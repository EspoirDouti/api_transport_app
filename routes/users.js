var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Reset = require('../models/reset_users');
var bcrypt = require('bcrypt');
var Nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/',async function(req, res, next) {
  var users = await User.find();
  res.json(users);
});

router.post('/', async function(req, res, next){
    // var type= req.body.type;
    // if(type == user){
      if(req.body.password != req.body.confirm){
        res.json({message: "Passwords does not match"});
      }else{
        // let user1 = await User.find({email: req.body.email});
       let user1 = await User.find( { $or:[{'email':req.body.email}, {'name':req.body.name} ]});
        let length = user1.length;
        console.log(length);
        if(length > 0){
          res.json({message: "User already exists"});
        }else{
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        var user = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hash
        });    
        try{
          const save= await user.save();
          res.json(save)
        }catch(err){
          res.json({message: err});
        }}
      }     
    // }
})

router.post('/login', async function(req, res, next){
  var user = await User.findOne({email: req.body.email});
  if(user){
    var compare = await bcrypt.compare(req.body.password,user.password);
    if(compare){
      res.json({message:"Login success",user:user});
    }else{
      res.json({message:"Password error"});
    }
  }else{
    res.json({message: "User does not exists"});
  }
})


router.put('/:id', async function(req, res, next){
  if(req.params.id != req.body.id){
    res.json("Informations does not match")
  }else{
    try{
    var save = await User.updateOne({_id: req.params.id}, { $set: {name: req.body.name, phone:req.body.phone, email:req.body.email }});

      if(save){
        res.json("succès")
      }else{
        res.json("echec")
      }
    }catch(err){
      res.json({message: err});
    }
  }
})


router.put('/cover/delete/:id', async function(req, res, next){
  if(req.params.id == req.body.id){
    try{
    var save = await User.updateOne({_id: req.params.id}, { $set: {cover:"cover.png"}});
      if(save){
        res.json("Cover deleted successfully")
      }else{
        res.json("Process Failure")
      }
    }catch(err){
      res.json({message: err});
    }
  }else{
    res.json({message:"You are not authorized to delete cover"})
  }
})


router.post('/reset', async function(req, res, next) {
  var email = req.body.email;
  let user = await User.findOne({email});
  if(!user) res.json({message:"User does not exists"});
  await new Reset({
    email: req.body.email
  });

  const transporter = Nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'randi.ebert44@ethereal.email',
      pass: 'UhZh36pqyrZfhd3FyB'
    },
    logger: true
  });

  // send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Espoir Test" <randi.ebert44@ethereal.email>', // sender address
  to: "murphyjunior82@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
});
res.json({message:"test reset message"})

}
)

module.exports = router;
