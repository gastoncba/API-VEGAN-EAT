const Product = require('../models/ProductModel')

const getProducts =  async (req, res) => {

    try {
        const products = await Product.find();
        res.json(products)
    }
    catch(e) {
        res.status(400).json({error: e.message})
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
        res.status(400).json({error: e.message})
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
        res.send(`Producto agregado con éxito`)
    } 

     catch(e) {
        res.status(400).json({error: e.message})
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
                img: body.img, 
                price: body.price, 
                stock: body.stock, 
                points: body.points
            }  
        })
        res.send(`Producto modificado con éxito`)
    } 

    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const updateStock = async (req, res) => {

    const {params, body} = req
    const {id} = params

    if(body.stock === undefined || !Number.isInteger(body.stock)) {
        return res.status(400).json({error: 'field stock is required and Integer'})
    }

    try {
        await Product.updateOne({_id:id}, {
            $set:{ 
                stock: body.stock, 
            }  
        })

        res.send(`Se modifico el stock del producto`)
    } 

    catch(e) {
        res.status(400).json({error: e.message})
    }
}

const deleteProduct = async (req, res) => {

    const {params} = req
    const {id} = params

    try {
        const prod = await Product.deleteOne({_id:id})
        if(prod.deletedCount) return res.send(`Producto eliminado con éxito`)
        
        res.send(`El producto no existe o fue eliminado`)
    }

    catch(e) {
        res.status(400).json({error: e.message})
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