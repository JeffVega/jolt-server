const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/job');

router.get('/jobs',(req,res,next)=>{
    const userId =req.user._id;
    console.log(req)
    Job.find({userId},(err,doc) =>{
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
    const job = new Jobs({
        name,
        website,
        position,
        userId
    })
   try{

       await job.save()
       await res.status(201).json(job)
        
   }
   catch(e){
       next(e)
   } 
})
router.delete('/jobs:id',async (req,res)=>{
    const {id} = req.params;
     let doc = await Job.findByIdAndRemove({"_id":id})
     await doc.exec();
    await  res.send('file has been deleted')
})
module.exports = router;