const express = require('express')
const router = express.Router();

const {getUsers, deleteUser, getOrdersUser, setOrderUser} =  require('../controllers/UserController')

router.get('/', (req, res) => getUsers(req, res))
router.get('/:id/orders', (req, res) => getOrdersUser(req, res))
router.patch('/add-order/:id',(req, res) =>  setOrderUser(req, res))
router.delete('/delete/:id', (req, res) => deleteUser(req, res))

module.exports = router