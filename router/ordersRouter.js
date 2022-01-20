const express = require('express')
const router = express.Router();

const {getOrders, setOrder, updateStateOrder} = require('../controllers/OrderController')

router.get('/', (req, res) => getOrders(req,res))
router.post('/create', (req, res) => setOrder(req, res))
router.patch('/update-state/:id', (req, res) => updateStateOrder(req, res))

module.exports = router