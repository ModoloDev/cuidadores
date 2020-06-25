const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    nomePaciente: {
        type: String,
        required: true
    },
    cpfPaciente: {
        type: String,
        required: true,
        unique: true
    },
    nomeResponsavel: {
        type: String,
        required: true
    },
    cpfResponsavel: {
        type: String,
        required: true,
        unique: true
    },
    sexo: {
        type: Number,
        required: true,
    },
    dataNsc: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Pacientes', schema);