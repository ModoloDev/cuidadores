const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const settings = require('./settings')

const app = express();

//Middleware CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin");
    app.use(cors());
    next();
});

const router = express.Router();

// Connect DB
mongoose.set('useCreateIndex', true);
mongoose.connect(settings.connectionStrig, { useNewUrlParser: true, useUnifiedTopology: true })

//Models
const Pacientes = require('./models/pacientesModel');
const Cuidadores = require('./models/cuidadoresModel');
const Responsaveis = require('./models/responsavelModel');

//Rotes
const guildRoute = require('./routes/appRoutes');

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

app.use('/', guildRoute);

module.exports = app;