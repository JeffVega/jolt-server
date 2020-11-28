const express = require('express');
const router = express.Router();
const User = require('../models/user');
/* GET users listing. */
router.post('/register', function(req, res) {
  const {username,password} = req.body;
  if(!username) res.sendStatus(500).send('Missing username');
  if(!password) res.sendStatus(500).send('Missing username');
    User.findOne({username},async (err,doc)=>{
      if(err) res.sendStatus(500).send(err);
      if(doc) res.send('User Already Exist');
      if(!doc){
        let hashPassword = await User.hashPassword(password)
          let newUser = await new User({
            username,
            password:hashPassword
          })
         await newUser.save()
         res.send(newUser)
      }
    })
});

module.exports = router;
