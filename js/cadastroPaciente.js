document.getElementById('btnCadastro').addEventListener('click', async () => {
    var nome = document.getElementById('inputNome').value;
    var cpf = document.getElementById('inputCPF').value;
    var dataNsc = document.getElementById('inputDataDeNasc').value;
    var sexo = document.getElementById('inputSexo').value;
    var endereco = document.getElementById('inputEndereco').value;

    var payloadJSONVerif = JSON.stringify({cpf: cpf});

    var verif = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body:   payloadJSONVerif,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then((data) => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data).length != 0) {
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
            window.alert('Paciente cadastrado com sucesso!');
            window.location.href = `adicionacuidador.html?c=${btoa(cpf)}`
        }
    })
})