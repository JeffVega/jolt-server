const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const JobRouter = require('./routes/job');
const authRouter = require('./routes/auth');
const {PORT,DATABASE} = require('./config');
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const cors = require('cors')
require('dotenv').config();

const app = express();
mongoose.connect(DATABASE, {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log(' mongoose is connected')
})
app.use(cors('http://localhost:3000'))
app.use(logger('dev'));
app.use(express.json());
// // app.use()
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(passport.initialize());


passport.use(localStrategy);
passport.use(jwtStrategy);
// app.use('/api', indexRouter);
app.use('/api', usersRouter);
app.use('/api',authRouter);
app.use(passport.authenticate('jwt',{session:false,failureRedirect:true}))
app.use('/api', JobRouter);

app.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`)
})
