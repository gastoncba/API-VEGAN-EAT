const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//funciones
const {getProducts, setProduct, updateProduct, deleteProduct, updateStock, getProductID} = require('../controllers/ProductController')
const {login, register, getUsers, deleteUser} =  require('../controllers/UserController')
const {verifyToken, isAdmin} =  require('../middleware/authJwt')
const createRoles = require('../libs/initialSetup')

//conectamos con mongoose
const mongoose = require("mongoose");

//importamos dotenv
const dotenv = require('dotenv');
dotenv.config();
const {USER, PASSWORD, DBNAME} = process.env;

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();
createRoles()

//Conexión a la base de datos 
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.agmw2.mongodb.net/${DBNAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Conectado a mongo!!!");
});

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "*",
    exposedHeaders: "*",
    credentials: true
}));
app.use(bodyParser())
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//routers
router.get('/', (req, res) => {res.send('API-VEGAN-EAT')})
router.get('/api/products', (req, res) => getProducts(req, res))
router.get('/api/products/:id', (req, res) => getProductID(req, res))
router.post("/api/create", [verifyToken, isAdmin] ,(req, res) => setProduct(req, res))
router.put('/api/update/:id', [verifyToken, isAdmin], (req, res) => updateProduct(req, res))
router.put('/api/update-stock/:id', (req, res) => updateStock(req, res))
router.delete('/api/delete/:id', (req, res) => deleteProduct(req, res))

router.post('/api/register', (req, res) => register(req, res))
router.post('/api/login', (req, res) => login(req, res))

router.get('/api/users', (req, res) => getUsers(req, res))
router.delete('/api/users/delete/:id', (req, res) => deleteUser(req, res))