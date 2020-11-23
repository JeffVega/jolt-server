const express = require('express');
const router = express.Router();
const Company = require('../models/company');

router.get('/',(req,res)=>{
    Company.find({}, async (err,doc)=>{
        if(err) throw console.error('this is a problem');
        if(doc){
            await res.send(doc);
        }
    })
})