const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model

const roleSchema = new Schema({
    name: 
    {
        type: String,
        required: true
    }
}, {versionKey: false})

const Role = model('role', roleSchema)

module.exports = Role