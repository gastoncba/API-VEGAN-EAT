const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model

const userSchema = new Schema({
    name: 
    {
        type: String,
        required:true,
    }, 
    lastName: 
    {
        type: String, 
        required: true
    },
    nickname: 
    {
        type: String,
        required: true
    }, 
    email: 
    {
        type:String, 
        required: true
    }, 
    password:  
    {
        type: String,
        required: true
    },
    roles: [{
        ref: 'role', //el "ref" el para hacer referencia o esta relacionado con otro modelo de datos 
        type: Schema.Types.ObjectId
    }]

}, {versionKey: false}) 

const User = model('user', userSchema)

module.exports = User