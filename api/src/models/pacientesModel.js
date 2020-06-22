const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
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