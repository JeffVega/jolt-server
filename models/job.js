const mongoose = require('mongoose');
const moment = require('moment');
const {Schema} = mongoose;

const JobSchema = new Schema({
    name:String,
    website:String,
    position:String,
    interview:{
        type:Boolean,
        default:false
    },
    notes:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created:{
        type:String,
        default:moment((Date.now())).format('hh:mmA MM/DD/YY')
    }

})

module.exports = mongoose.model('Job',JobSchema);