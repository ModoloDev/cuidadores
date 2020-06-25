const mongoose = require('mongoose');
const Paciente = mongoose.model('Pacientes');
const Cuidador = mongoose.model('Cuidadores');

exports.postCadastroPaciente = (req, res, next) => {

    // exemplo de body = {
    //     "nomePaciente": "Nome do Paciente",
    //     "cpfPaciente": "XXXXXXXXXXXXX",
    //     "nomeResponsavel": "Nome do Responsavel",
    //     "cpfResponsavel": "YYYYYYYYYYYYY",
    //     "sexo": "M",
    //     "dataNsc": "",
    //     "telefone": "8899999-9999",
    //     "endereco": "Rua Teste, 01 - Bairro Teste - UF - Brasil",
    //     "email": "exemplo@exemplo.com.br",
    //     "senha": "senha"
    // }

    let cadastro = new Paciente(req.body);
    cadastro.save().then(x => {
        res.status(200).send({message: "Paciente cadastrado com sucesso!", data: req.body})
    }).catch(e => {
        res.status(400).send({message: e});
    })
};

exports.postCadastroCuidador = (req, res, next) => {

    // exemplo de body sem pacientes = {
    //     "nome": "Nome do Cuidador",
    //     "cpf": "XXXXXXXXXXXXX",
    //     "sexo": "F",
    //     "dataNsc": "",
    //     "telefone": "9988888-8888",
    //     "endereco": "endereco": "Avenida Teste, 02 - Vila Teste - UF - Brasil",
    //     "email": "exemplo@exemplo.com.br",
    //     "senha": "senha"
    // }

    // exemplo de body com pacientes = {
    //     "nome": "Nome do Cuidador",
    //     "cpf": "XXXXXXXXXXXXX",
    //     "sexo": "F",
    //     "dataNsc": "",
    //     "telefone": "9988888-8888",
    //     "endereco": "endereco": "Avenida Teste, 02 - Vila Teste - UF - Brasil",
    //     "email": "exemplo@exemplo.com.br",
    //     "senha": "senha",
    //     "pacientes": [cpf1, cpf2, cpf3, ...]
    // }

    let cadastro = new Cuidador(req.body);
    cadastro.save().then(x => {
        res.status(200).send({message: "Cuidador cadastrado com sucesso!", data: req.body})
    }).catch(e => {
        res.status(400).send({message: e});
    })
}

exports.postAdicionaPacienteCuidador = (req, res, next) => {

    // exemplo do body = {
    //     "cuidador": {
    //         "cpf": "XXXXXXXXXX"
    //     },
    //     "paciente": {
    //         cpf: "YYYYYYYYY"
    //     }
    // }

    Cuidador.find({
        cpf: req.body.cuidador.cpf
    }).then(data => {
        data = data[0]
        lista  = data.pacientes
        lista.push(req.body.paciente.cpf)
        data.pacientes = lista
        Cuidador.replaceOne({
            cpf: req.body.cuidador.cpf
        }, data).then(x => {
            res.status(200).send({message: "Paciente atribuido com sucesso!"})
        }).catch(e => {
            res.status(400).send({message: `Erro ao cadastrar paciente! - ${e}`, data: data})
        })
    }).catch(e => {
        res.status(400).send({message: `Erro ao encontrar cuidador - ${e}`, data: req.body.cuidador.cpf})
    })
}

exports.getUserCPF = async (req, res, next) => {

    // exemplo de body = {
    //     cpf: "XXXXXXXXXXXXXXX"
    // }

    var dataPaciente = await getPacientesCPF(req.body.cpf);
    var dataCuidador = await getCuidadoresCPF(req.body.cpf);

    if (dataPaciente === undefined && dataCuidador === undefined) {
        res.status(400).send({message: 'Erro ao buscar Usuarios'})
    } else {
        res.status(200).send({data: {paciente: dataPaciente, cuidador: dataCuidador}})
    }
}

exports.getUserEmail = async (req, res, next) => {

    // exemplo de body = {
    //     email: "exemplo@exemplo.com.br"
    // }

    var dataPaciente = await getPacientesEmail(req.body.email);
    var dataCuidador = await getCuidadoresEmail(req.body.email);

    if (dataPaciente === undefined && dataCuidador === undefined) {
        res.status(400).send({message: 'Erro ao buscar Usuarios'})
    } else {
        res.status(200).send({data: {paciente: dataPaciente, cuidador: dataCuidador}})
    }
}

async function getPacientesEmail(email) {

    var promise = new Promise(function (resolve, rejected){
        Paciente.find({
            email: email
        }).then(data => {
            resolve(data[0])
        }).catch(e => {
            resolve(false)
        })
    })
    return promise;
}

async function getPacientesCPF(cpf) {

    var promise = new Promise(function (resolve, rejected){
        Paciente.find({
            cpf: cpf
        }).then(data => {
            resolve(data[0])
        }).catch(e => {
            resolve(false)
        })
    })
    return promise;
}

async function getCuidadoresEmail(email) {

    var promise = new Promise(function (resolve, rejected){
        Cuidador.find({
            email: email
        }).then(data => {
            resolve(data[0])
        }).catch(e => {
            resolve(false)
        })
    })
    return promise;
}

async function getCuidadoresCPF(cpf) {

    var promise = new Promise(function (resolve, rejected){
        Cuidador.find({
            cpf: cpf
        }).then(data => {
            resolve(data[0])
        }).catch(e => {
            resolve(false)
        })
    })
    return promise;
}