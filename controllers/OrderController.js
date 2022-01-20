const Order = require('../models/OrderModel')
const Pay = require('../models/PayModel')
const User = require('../models/UserModel') 

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find() 
        res.json(orders)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const setOrder = async (req, res) => {

    const {body} = req

    if(body.formaDePago) {
        try {
            const foundPay = await Pay.findOne({name: body.formaDePago})
            body.formaDePago = foundPay._id
        } catch (error) {
            res.status(400).json({error: error})
        }
    } else {
        res.status(400).json({error: 'formaDePago is required'})
    }

    const oOrder = new Order(body)

    const error = oOrder.validateSync();

    if(error) return res.status(400).json({error: error.message})

    try {
        await oOrder.save()
        res.send('Orden agregada')
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateStateOrder = async (req, res) => {
    
    const {params, body} = req
    const {id} = params
    let stateName = ''

    if(body.state !== true && body.state !== false) {
        return res.status(400).json({error: 'entregado is required'})
    } 

    if(body.state) {
        stateName = 'entregado'
    } else {
        stateName = 'pendiente'
    }

    try {
        await Order.updateOne({_id:id}, {
            $set:{
                entregado: body.state
            }  
        })

        res.send(`se modifico la orden de id: ${id} al estado ${stateName}`)
        
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const deleteOrder = async (req, res) => {
    const {params} = req
    const {id} = params

    try {
        const userFind = await User.findOne({orders: id})

        //preguntamos si tiene un usuario asiociado
        if(userFind) {
            const {_id} = userFind
            await User.updateOne({_id:_id},{
                $pull:{orders: id}
            })
        }
    
        const orderDel = await Order.deleteOne({_id:id})

        if(orderDel.deletedCount) return res.send(`Se elimino la orden de id: ${id}`)
        res.send(`La orden de id: ${id} no existe o fue eliminada`)
    }

    catch(e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = {
    getOrders,
    setOrder,
    updateStateOrder,
    deleteOrder
}