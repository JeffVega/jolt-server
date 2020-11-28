const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    created:{
        type:String,
        default:moment((Date.now())).format('hh:mmA MM/DD/YY')
    }
})
UserSchema.set('toObject', {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }})
UserSchema.methods.vaildPassword = (password)=>{
    return bcrypt.compare(password,this.password)
}
UserSchema.statics.hashPassword = (password) =>{
    return bcrypt.hash(password,10)
}
module.exports = mongoose.model('User',UserSchema)