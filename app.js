const express = require("express");
const AppError = require("./utils/appError");
const bodyParser = require("body-parser");
const cors = require("cors")
const router = require('./routers/index')
const errorHandler = require('./middleware/error.middleware')
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use((req, res, next) => {
    console.log(req.method + " " + req.url)
    next()
});
app.use("/api", router)

app.use('/images', express.static('public'));
app.use(errorHandler)

app.use(require("./controllers/error.controller"));


module.exports = app;