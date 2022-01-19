const express = require('express')
const router = express.Router();

const {login, register} =  require('../controllers/UserController')

router.post('/register', (req, res) => register(req, res))
router.post('/login', (req, res) => login(req, res))

module.exports = router