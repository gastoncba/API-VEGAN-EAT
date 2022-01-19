const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model

const paySchema = new Schema({
    name: 
    {
        type: String,
        required: true
    }
}, {versionKey: false})

const Pay = model('pay', paySchema)

module.exports = Pay