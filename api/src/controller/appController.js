const mongoose = require('mongoose');
const Paciente = mongoose.model('Pacientes');
const Cuidador = mongoose.model('Cuidadores');
const Responsavel = mongoose.model('Responsaveis');

exports.postCadastroPaciente = (req, res, next) => {

    // exemplo de body = {
    //     "nome": 
    //     "cpf": 
    //     "sexo": 
    //     "dataNsc": 
    //     "endereco": 
    //     "info":
    //     "calendario":
    // }

    let cadastro = new Paciente(req.body);
    cadastro.save().then(() => {
        res.status(200).send({message: "Paciente cadastrado com sucesso!", data: req.body})
    }).catch(e => {
        res.status(400).send({message: e});
    })
};

exports.postCadastroCuidador = (req, res, next) => {

    // exemplo de body = {
    //     "nome": 
    //     "cpf": 
    //     "genero": 
    //     "dataNsc": 
    //     "telefone": 
    //     "endereco": 
    //     "email": 
    //     "senha": 
    // }

    let cadastro = new Cuidador(req.body);
    cadastro.save().then(() => {
        res.status(200).send({message: "Cuidador cadastrado com sucesso!", data: req.body})
    }).catch(e => {
        res.status(400).send({message: e});
    })
}

exports.postCadastroResponsavel = (req, res, next) => {

    // exemplo de body = {
    //     "nome": 
    //     "cpf": 
    //     "dataNsc": 
    //     "telefone":
    //     "email":
    //     "senha": 
    // }

    let cadastro = new Responsavel(req.body);
    cadastro.save().then(() => {
        res.status(200).send({message: "Responsavel cadastrado com sucesso!", data: req.body});
    }).catch (e => {
        res.status(400).send({message: e});
    });
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
        data = data[0];
        lista  = data.pacientes;
        lista.push(req.body.paciente.cpf);
        data.pacientes = lista;
        Cuidador.replaceOne({
            cpf: req.body.cuidador.cpf
        }, data).then(() => {
            res.status(200).send({message: "Paciente atribuido com sucesso!"});
        }).catch(e => {
            res.status(400).send({message: `Erro ao atribuir paciente! - ${e}`, data: data});
        })
    }).catch(e => {
        res.status(400).send({message: `Erro ao encontrar cuidador - ${e}`, data: req.body.cuidador});
    })
}

exports.postAdicionaPacienteResponsavel = (req, res, next) => {

    // exemplo de body = {
    //     "responsavel": {
    //         "cpf": cpf
    //     },
    //     "paciente": {
    //         "cpf": cpf
    //     }
    // }

    Responsavel.find({
        cpf: req.body.responsavel.cpf
    }).then(data => {
        data = data[0];
        lista = data.pacientes;
        lista.push(req.body.paciente.cpf);
        data.pacientes = lista;
        Responsavel.replaceOne({
            cpf: req.body.responsavel.cpf
        }, data).then(() => {
            res.status(200).send({message: "Paciente atribuido com sucesso!"});
        }).catch(e => {
            res.staus(400).send({message: `Erro ao atribuir paciente! - ${e}`, data: req.body.responsavel});
        })
    })
}

exports.getUserCPF = async (req, res, next) => {

    // exemplo de body = {
    //     cpf: "XXXXXXXXXXXXXXX"
    // }

    var dataPaciente = await getPacientesCPF(req.body.cpf);
    var dataCuidador = await getCuidadoresCPF(req.body.cpf);
    var dataResponsavel = await getResponsaveisCPF(req.body.cpf);

    if (dataPaciente === undefined && dataCuidador === undefined && dataResponsavel === undefined) {
        res.status(400).send({message: 'Erro ao buscar Usuarios'})
    } else {
        res.status(200).send({data: {paciente: dataPaciente, cuidador: dataCuidador, responsavel: dataResponsavel}})
    }
}

exports.getUserEmail = async (req, res, next) => {

    // exemplo de body = {
    //     email: "exemplo@exemplo.com.br"
    // }

    var dataPaciente = await getPacientesEmail(req.body.email);
    var dataCuidador = await getCuidadoresEmail(req.body.email);
    var dataResponsavel = await getResponsaveisEmail(req.body.email);

    if (dataPaciente === undefined && dataCuidador === undefined && dataResponsavel === undefined) {
        res.status(400).send({message: 'Erro ao buscar Usuarios'})
    } else {
        res.status(200).send({data: {paciente: dataPaciente, cuidador: dataCuidador, responsavel: dataResponsavel}})
    }
}

exports.getCuidadores = (req, res, next) => {

    // Sem body

    Cuidador.find({}).then(data => {
        data.forEach((user) => {
            user.senha = undefined;
        })
        res.status(200).send({data: data});
    }).catch(e => {
        res.status(400).send({message: e});
    })
}

exports.saveInfo = (req, res, next) => {

    // exemplo de body = {
    //     cpf: CPF do Paciente,
    //     info: "String com o conteudo do EditorJs"
    // }

    Paciente.find({
        cpf: req.body.cpf
    }).then(data => {
        data = data[0];
        data.info = req.body.info
        Paciente.replaceOne({
            cpf: req.body.cpf
        }, data).then(() => {
            res.status(200).send({message: "Sucesso!", data: req.body.info})
        }).catch(error => {
            res.status(400).send({message: "Fail!", data: error})
        })
    })
}

exports.saveCalendarioPaciente = (req, res, next) => {

    // exemplo de body = {
    //     cpf:
    //     calendario: 
    // }

    Paciente.find({
        cpf: req.body.cpf
    }).then(data => {
        data = data[0];
        data.calendario = req.body.calendario
        Paciente.replaceOne({
            cpf: req.body.cpf
        }, data).then(() => {
            res.status(200).send({message: "Sucesso!", data: req.body.calendario});
        }).catch(error => {
            res.staus(400).send({data: error});
        })
    })

}

exports.saveCalendarioCuidador = (req, res, next) => {

    // exemplo de body = {
    //     cpf:
    //     calendario: 
    // }

    Cuidador.find({
        cpf: req.body.cpf
    }).then(data => {
        data = data[0];
        data.calendario = req.body.calendario
        Cuidador.replaceOne({
            cpf: req.body.cpf
        }, data).then(() => {
            res.status(200).send({message: "Sucesso!", data: req.body.calendario});
        }).catch(error => {
            res.staus(400).send({data: error});
        })
    })

}

exports.removeCuidador = (req, res, next) => {

    // exemplo de body = {
    //     paciente: {
    //         cpf: 
    //     },
    //     cuidador: {
    //         cpf:
    //     }
    // }

    Cuidador.find({cpf: req.body.cuidador.cpf}).then(data => {
        data = data[0]
        for (let i = 0; i < data.pacientes.length; i++) {
            if (data.pacientes[i] == req.body.paciente.cpf) {
                data.pacientes.splice(i, 1)
                break;
            }
        }
        Cuidador.replaceOne({cpf: req.body.cuidador.cpf}, data).then(() => {
            res.status(200).send({message: "Sucesso!", data: data})
        }).catch(error => {
            res.staus(400).send({message: 'Fail', data: error})
        })
    })

}

async function getPacientesEmail(email) {

    var promise = new Promise((resolve, rejected) => {
        Paciente.find({
            email: email
        }).then(data => {
            resolve(data)
        }).catch(() => {
            rejected(false)
        })
    })
    return promise;
}

async function getPacientesCPF(cpf) {

    var promise = new Promise((resolve, rejected) => {
        Paciente.find({
            cpf: cpf
        }).then(data => {
            resolve(data)
        }).catch(() => {
            rejected(false)
        })
    })
    return promise;
}

async function getCuidadoresEmail(email) {

    var promise = new Promise((resolve, rejected) => {
        Cuidador.find({
            email: email
        }).then(data => {
            resolve(data)
        }).catch(() => {
            rejected(false)
        })
    })
    return promise;
}

async function getCuidadoresCPF(cpf) {

    var promise = new Promise((resolve, rejected) => {
        Cuidador.find({
            cpf: cpf
        }).then(data => {
            resolve(data)
        }).catch(() => {
            rejected(false)
        })
    })
    return promise;
}

async function getResponsaveisEmail(email) {

    var promise = new Promise((resolve, rejected) => {
        Responsavel.find({
            email: email
        }).then(data => {
            resolve(data)
        }).catch(() => {
            rejected(false)
        })
    })
    return promise;
}

async function getResponsaveisCPF(cpf) {

    var promise = new Promise((resolve, rejected) => {
        Responsavel.find({
            cpf: cpf
        }).then(data => {
            resolve(data)
        }).catch(() => {
            rejected(false)
        })
    })
    return promise;
}