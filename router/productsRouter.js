const express = require('express')
const router = express.Router();

const {getProducts, setProduct, updateProduct, deleteProduct, updateStock, getProductID} = require('../controllers/ProductController')
const {verifyToken, isAdmin} =  require('../middleware/authJwt')

router.get('/', (req, res) => getProducts(req, res))
router.get('/:id', (req, res) => getProductID(req, res))
router.post('/create', [verifyToken, isAdmin], (req, res) => setProduct(req, res))
router.put('/update/:id', [verifyToken, isAdmin] ,(req, res) => updateProduct(req, res))
router.put('/update-stock/:id', (req, res) => updateStock(req, res))
router.delete('/delete/:id', [verifyToken, isAdmin] ,(req, res) => deleteProduct(req, res))

module.exports = router