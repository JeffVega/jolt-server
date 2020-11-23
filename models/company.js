const mongoose = requier('mongoose');
const moment = require('moment');
const {Schema} = mongoose;

const CompanySchema = new Schema({
    name:String,
    website:String,
    position:String,
    interview:{
        type:Boolean,
        default:false
    },
    notes:String,
    created:{
        type:Date,
        default:moment((Date.now())).format('hh:mmA MM/DD/YY')
    }

})

module.exports = mongoose.model('Company',CompanySchema);