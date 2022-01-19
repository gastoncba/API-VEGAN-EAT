const express = require('express')
const router = express.Router();

const {getOrders, setOrder} = require('../controllers/OrderController')

router.get('/', (req, res) => getOrders(req,res))
router.post('/create', (req, res) => setOrder(req, res))

module.exports = router