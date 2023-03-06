var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Transporter = require('../models/transporter');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/',async function(req, res, next) {
    var transporters = await Transporter.find();
  res.json(transporters);
});

router.post('/', async function(req, res, next){
    if(req.body.password != req.body.confirm){
      res.json({message: "Passwords does not match"});
    }else{
      // let transporter1 = await Transporter.findOne({email: req.body.email});
      let transporter1 = await Transporter.find( { $or:[{'email':req.body.email}, {'name':req.body.name} ]});
      if(transporter1){
        res.json({message: "This Transporter already exists"});
      }else{
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(req.body.password, salt);
      var transporter = new Transporter({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        location:req.body.location,
        truck:req.body.truck,
        company_id:req.body.company_id
      });    
      try{
        const save= await transporter.save();
        res.json(save)
      }catch(err){
        res.json({message: err});
      }
  }        
}}
)

router.post('/login', async function(req, res, next){
  var transporter = await Transporter.findOne({email: req.body.email});
  if(transporter){
    var compare = await bcrypt.compare(req.body.password,transporter.password);
    if(compare){
      res.json({message:"Login success",transporter});
    }else{
      res.json({message:"Password error"});
    }
  }else{
    res.json({message: "This Transporter does not exists"});
  }
})

module.exports = router;
