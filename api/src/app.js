const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const settings = require('./settings')

const app = express();
const router = express.Router();

// Connect DB
mongoose.set('useCreateIndex', true);
mongoose.connect(settings.connectionStrig, { useNewUrlParser: true, useUnifiedTopology: true })

//Models
const Pacientes = require('./models/pacientesModel');
const Cuidadores = require('./models/cuidadoresModel');

//Rotes
const guildRoute = require('./routes/appRoutes');

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }));

app.use('/', guildRoute);

module.exports = app;