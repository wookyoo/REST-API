const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:50
    },
    enrolled:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User', userSchema);

