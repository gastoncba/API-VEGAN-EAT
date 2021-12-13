const User = require('../models/UserModel')
const Role = require('../models/RoleModel')
const jwt = require('jsonwebtoken')

//Aca verficamos si nos esta enviando un Token
const verifyToken = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"]

        if(!token) return res.status(404).json({error: 'No hay token'})

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        
        req.userID = decoded.id //al hacer esto ponemos una nueva propiedad a "req" la cual es userID 
        //que tiene el id del usuario y nos va a servir cuando verifiquemos los roles en la funcion de abajo

        const user = await User.findById(req.userID)

        if(!user) return res.status(404).json({error: 'No existe usuario'})

        next()

    } catch(e) {
        return res.status(401).json({error: 'No autorizado'})
    }
}

//aca verificamos si es administrador 
const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userID)
    const roles = await Role.find({_id: {$in: user.roles}})
    
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === 'administrador') {
            next()
            return
        }
    } 

    return res.status(401).json({error: 'No tiene autorización de administrador'})
}

module.exports = {
    verifyToken,
    isAdmin
}