const express = require('express')
const router = express.Router();

const {getUsers, deleteUser} =  require('../controllers/UserController')

router.get('/', (req, res) => getUsers(req, res))
router.delete('/delete/:id', (req, res) => deleteUser(req, res))

module.exports = router