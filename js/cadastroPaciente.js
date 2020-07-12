document.getElementById('btnCadastro').addEventListener('click', async () => {
    var nome = document.getElementById('inputNome').value;
    var cpf = document.getElementById('inputCPF').value;
    var dataNsc = document.getElementById('inputDataDeNasc').value;
    var sexo = document.getElementById('inputSexo').value;
    var endereco = document.getElementById('inputEndereco').value;

    if (!VerificaCPF((cpf).replace(/[.]+/g, '').replace(/[-]+/g, ''))){
        window.alert('Esse CPF não é válido!');
        return;
    }

    if (!TestaData(dataNsc)) {
        window.alert('Essa data é inválida!');
        return;
    }

    var payloadJSONVerif = JSON.stringify({cpf: cpf});

    var verif = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body:   payloadJSONVerif,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then((data) => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data.paciente).length !== 0 || Object.keys(data.data.responsavel).length !== 0 || Object.keys(data.data.cuidador).length !== 0) {
            window.alert('Já existe um usuário com esse cpf!');
            window.location.reload(true);
            throw new Error('Cadastro repetido!');
        }
    })

    var payloadJSONPaciente = JSON.stringify({
        nome: nome,
        cpf: cpf,
        dataNsc: dataNsc,
        sexo: sexo,
        endereco: endereco,
        info: ""
    })

    await fetch(`${URL_API}/cadastro/paciente`, {
        method: 'POST',
        body: payloadJSONPaciente,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    }).then(async (response) => {
        if (response.status == 400) {
            window.alert('Houve um erro ao cadastrar o paciente');
            window.location.reload(true);
        }
    })

    var payloadJSONResponsavel = JSON.stringify({
        responsavel: {
            cpf: userInfo.cpf
        },
        paciente: {
            cpf: cpf
        }
    })

    await fetch(`${URL_API}/adiciona/responsavel`, {
        method: 'POST',
        body: payloadJSONResponsavel,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    }).then(async (response) => {
        if (response.status == 400) {
            window.alert('Houve um erro ao cadastrar o paciente');
            window.location.reload(true);
        } else {
            window.location.href = `adicionacuidador.html?c=${btoa(cpf)}`
        }
    })
})

VerificaCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
}

TestaData = (tempo) => {
    let dia = tempo.substring(0, 2);
    let mes = tempo.substring(3, 5);
    let ano = tempo.substring(6, 10);
    if (mes > 12) return false;
    if (ano > 2001 || ano < 1900) return false;
    if (mes in [1, 3, 5, 7, 8, 10, 12] && dia > 31) return false;
    else if (mes == 2){
        if ((ano % 4 === 0) && (ano % 400 !== 0) && (dia > 29)) return false;
        else if (dia > 28) return false;
    }
    else if (dia > 30) return false;
    return true;
}