const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model

const productSchema = new Schema({
    name: 
        {
            type:String, 
            required:true,
            maxlength: 255
        }, 
    desc: 
        {
            type:String, 
            required:true,
            MaxLength: 300
        }, 
    img: 
        {
            type:String, 
            required:true
        },
    price: 
        {
            type: Number , 
            required:true,
            min: 1
        }, 
    stock: 
        {
            type: Number, 
            validate: {
                validator: function(v) {
                  return Number.isInteger(v);
                },
                message: props => `${props.value} not is integer!`
              },
            required:true, 
            min: 0
        },

    points: 
    {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
}, {versionKey: false})

const Product = model('product', productSchema)

module.exports = Product