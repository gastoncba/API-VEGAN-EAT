const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model

const orderSchema = new Schema({
    address1: 
    {
        cuidad: 
        {
            type: String,
            required: true
        },
        calle: 
        {
            type: String,
            required: true
        }, 
        nroCalle: 
        {
            type: String,
            required: true
        }
    },
    address2: 
    {
        type:String, 
        required: false,
    },
    telefono: 
    {
        type: String, 
        required: true,  
    }, 
    infoExtra: 
    {
        type: String,
        required:false,
    },
    formaDePago: 
    {
        ref: 'pay',
        type: Schema.Types.ObjectId,
        require: true
    },
    tiempoEntrega: 
    {
        type: String,
        required: true
    },
    entregado: 
    {
        type: Boolean,
        required: true
    }, 

}, {versionKey: false})

const Order = model('order', orderSchema)

module.exports = Order