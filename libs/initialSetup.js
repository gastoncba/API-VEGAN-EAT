const Role = require('../models/RoleModel')
const Pay = require('../models/PayModel')

const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount() 

        if (count > 0) return 

        const values = await Promise.all([
            new Role({name:'cliente'}).save(),
            new Role({name:'administrador'}).save()
        ])
    }

    catch(e) {
        console.log(e)
    }
}

const createPayments = async () => {
    try {
        const count = await Pay.estimatedDocumentCount()

        if (count > 0) return 

        const pay = await Promise.all([
            new Pay({name: 'Efectivo'}).save(),
            new Pay({name: 'Tarjeta'}).save()
        ])
    } catch (e) {
        console.log(e)
    }
}

module.exports = {createRoles, createPayments}