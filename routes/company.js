const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/company');

router.get('/jobs',(req,res,next)=>{
    const userId =req.user._id;
    console.log(req)
    Company.find({userId},(err,doc) =>{
        if(err) next(err)
       if(doc) res.send(doc)
    })
})


router.post('/jobs',async (req,res,next)=>{
    const userId =req.user._id;
    console.log(userId)
    const { name,website,position} = req.body;
    if(!name) res.send('Name is missing');
    if(!website) res.send('Website is missing')
    if(!position) res.send('Position is missing')
    const company = new Company({
        name,
        website,
        position,
        userId
    })
   try{

       await company.save()
       await res.status(201).json(company)
        
   }
   catch(e){
       next(e)
   } 
})
router.delete('/company:id',(req,res)=>{
    const {id} = req.params;
    Company.findByIdAndRemove({"_id":id})
})
module.exports = router;