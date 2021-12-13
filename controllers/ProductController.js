const Product = require('../models/ProductModel')

const getProducts =  async (req, res) => {

    try {
        const products = await Product.find();
        res.json(products)
    }
    catch(e) {
        res.send(e)
    }
}

const getProductID = async (req, res) => {

    const {params} = req
    const {id} = params; 

    try {
        const product = await Product.findById(id)
        res.json(product)
    }   
    catch(e) {
        res.send(e)
    }
}

const setProduct = async (req, res) => {
     
    const {body} = req
    const oProduct = new Product(body)

    const error = oProduct.validateSync();
    if(error) {
        return res.status(400).json({error: error.message})
    }
    try{
        await oProduct.save()
        res.send(`Producto agregado`)
    } 

     catch(e) {
         res.send(e)
    }
}

const updateProduct = async (req, res) => {

    const {params} = req
    const {id} = params
    const {body} = req

    const oProduct = new Product(body)
    const error = oProduct.validateSync();

    if(error) {
        return res.status(400).json({error: error.message})
    }

    try {
        await Product.updateOne({_id:id}, {
            $set:{
                name: body.name, 
                desc: body.desc, 
                price: body.price, 
                stock: body.stock, 
            }  
        })
        res.send(`se modifico el producto de id: ${id}`)
    } 

    catch(e) {
        res.send(e)
    }
}

const updateStock = async (req, res) => {

    const {params} = req
    const {id} = params
    const {body} = req

    if(!body.stock || !Number.isInteger(body.stock)) {
        return res.status(400).json({error: 'field stock is required and Integer'})
    }

    try {
        await Product.updateOne({_id:id}, {
            $set:{ 
                //se le asiga el nuevo stock
                stock: body.stock, 
            }  
        })

        res.send(`se modifico el stock del producto de id: ${id}`)
    } 

    catch(e) {
        res.send(e)
    }
}

const deleteProduct = async (req, res) => {

    const {params} = req
    const {id} = params

    try {
        await Product.deleteOne({_id:id})
        res.send(`se elimino el producto de id: ${id}`)
    }

    catch(e) {
        console.log(e)
    }
}

module.exports = {
    getProducts,
    setProduct, 
    updateProduct,
    updateStock,
    deleteProduct,
    getProductID
}