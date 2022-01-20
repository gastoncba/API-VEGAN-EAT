const express = require('express')
const routerApi = require('../router')
const cors = require('cors')
const bodyParser = require('body-parser')

const {createRoles, createPayments} = require('../libs/initialSetup')

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
createPayments()

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
routerApi(app)
