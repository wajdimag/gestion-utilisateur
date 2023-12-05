const http = require('http');
const express = require('express');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const mongoConnect = require('./config/dbconnection.json');
const utilisateurRouter = require('./routes/utilisateur');
const dotenv = require('dotenv');

const app = express();  
const path = require('path');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/utilisateur", utilisateurRouter);
dotenv.config();
mongo.connect(mongoConnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongo connected')).catch((err) => console.log(err));

const server = http.createServer(app);

server.listen(3000, () => console.log('server run'));
