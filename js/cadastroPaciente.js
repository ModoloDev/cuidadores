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
            window.alert('Paciente cadastrado com sucesso!');
            window.location.href = `adicionacuidador.html?c=${btoa(cpf)}`
        }
    })
})

VerificaCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}