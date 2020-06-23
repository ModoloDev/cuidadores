const mongoose = require('mongoose');
const Paciente = mongoose.model('Pacientes');
const Cuidador = mongoose.model('Cuidadores');

exports.postCadastroPaciente = (req, res, next) => {

    // exemplo de body = {
    //     "nome": "Nome do Paciente",
    //     "cpf": "XXXXXXXXXXXXX",
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
    //     "email": "exemplo@exemplo.com.br",
    //     "senha": "senha"
    // }

    // exemplo de body com pacientes = {
    //     "nome": "Nome do Cuidador",
    //     "cpf": "XXXXXXXXXXXXX",
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

exports.getCuidador = (req, res, next) => {

    // exemplo de body = {
    //     cpf: "XXXXXXXXXXXXXXX"
    // }

    Cuidador.find({
        cpf: req.body.cpf
    }).then(data => {
        res.status(200).send({data: data[0]})
    }).catch(e => {
        res.status(400).send({message: `${e}`})
    })  
}

exports.getPaciente = (req, res, next) => {

    // exemplo de body = {
    //     cpf: "XXXXXXXXXXXXX"
    // }

    Paciente.find({
        cpf: req.body.cpf
    }).then(data => {
        res.status(200).send({data: data[0]})
    }).catch(e => {
        res.status(400).send({message: `${e}`})
    })
}