const express = require('express')
const router = express.Router();

const {login, register} =  require('../controllers/UserController')

router.post('/api/register', (req, res) => register(req, res))
router.post('/api/login', (req, res) => login(req, res))

module.exports = router