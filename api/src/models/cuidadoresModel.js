const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    pacientes: [{
        type: String,
        require: true,
        default: ""
    }]
});

module.exports = mongoose.model('Cuidadores', schema);