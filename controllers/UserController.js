const User = require('../models/UserModel')
const Role = require('../models/RoleModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');

const validatorRegister = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(20).required(),
    nickname: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(3).max(255).required().email(),
    roles: Joi.array()
})


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch(e) {
        res.send(`error: ${e}`)
    }
}

const deleteUser = async (req, res) => {

    const {params} = req
    const {id} = params
    
    try {
        const user = await User.deleteOne({_id:id})
        if(user.deletedCount) return res.send(`se elimino el usuario de id: ${id}`)
        
        res.send(`El usuario de id: ${id} no existe o fue eliminado`)
    }

    catch(e) {
        res.send(`error: ${e}`)
    }
} 

const register = async (req, res) => {

    const {body} = req
    const {error} = validatorRegister.validate(body) 

    if(error) {
        const alert = error.details[0].message
        return res.status(400).json({error: alert})
    }

    const {name, lastName, nickname, email, password, roles} = body
    
    //verificamos si el nickname ya fue registrado
    const nicknameDB = await User.findOne({nickname: nickname})
    if(nicknameDB) {
        return res.status(400).json({error:'Nombre de usuario ya registrado'})
    }

    //aca verificamos si el email del usuario ya fue registrado
    const emailDB = await User.findOne({email: email})
    if (emailDB) {
        return res.status(400).json({error:'Email ya registrado'})
    }
    
    //aca se encripta la password
    const increment = await bcrypt.genSalt(10) //saltos     
    const passwordEncrypted = await bcrypt.hash(password, increment) //password encriptada

    try {
        const oUser = new User ({
            name: name,
            lastName: lastName,
            nickname: nickname,
            email: email, 
            password: passwordEncrypted,
        })
        
        //verficamos si hay roles, si no tiene le asignamos el rol de "User" común
        if(roles) {
            const foundRoles = await Role.find({name: {$in: roles}})
            if(foundRoles.length > 0) {
                oUser.roles = foundRoles.map(role => role._id)
            } else {
                return res.status(400).json({error:'Rol Inexistente'})
            }
        } else {
            console.log('hola')
            const foundRole = await Role.findOne({name:'cliente'})
            oUser.roles = [foundRole._id]
        }

        //se guarda el nuevo usuario
        await oUser.save()

        const token = jwt.sign({
            name: oUser.name,
            id: oUser._id
        }, process.env.TOKEN_SECRET, {expiresIn: 86400}) //24 horas
        
        res.header('auth-token', token).json({
            data: {token}
        })
    }

    catch(e) {
        res.status(400)
    }
} 

const login = async (req, res) => {
    
    //obtenemos el nickname y la password del body , que hasta aqui son correctas sintacticamente.
    const {nickname, password} = req.body

    if(!nickname) {
        return res.status(400).json({error:'nickname requerido'})
    }

    if(!password) {
        return res.status(400).json({error:'contraseña requerida'})
    }
    
    //verficamos si el usuario se encuentra registrado 
    const userDB = await User.findOne({nickname: nickname})
    if (!userDB) {
        return res.status(400).json({error:'Usuario no encontrado'})
    }

    //se verifica la constraseña 
    const validPassword = await bcrypt.compare(password, userDB.password)

    if(!validPassword) {
        return res.status(400).json({error: 'Constraseña incorrecta'})
    }

    const token = jwt.sign({
        name: userDB.name,
        id: userDB._id
    }, process.env.TOKEN_SECRET, {expiresIn: 10800}) //24 horas)
    
    res.header('auth-token', token).json({
        data: {token}
    })
}

module.exports = {
    register, 
    login, 
    getUsers,
    deleteUser
}