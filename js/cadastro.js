const URL_API = 'https://cuidadores-api-pjxy6vdnga-uw.a.run.app'

document.getElementById('btnCadastro').addEventListener('click', async () => {

    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputSenha').value;
    var repetirSenha = document.getElementById('inputRepetirSenha').value;
    var checkmarkResponsavel = document.getElementById('checkmarkResponsavel').checked;

    if (checkmarkResponsavel) {
        var nome = document.getElementById('inputNomeResp').value;
        var cpf = document.getElementById('inputCPFResp').value;
        var telefone = document.getElementById('inputTelefoneResp').value;
        var dataNsc = document.getElementById('inputDataDeNascResp').value;

        var user = 'responsavel'

        var payloadJSON = JSON.stringify({
            "nome": nome,
            "cpf": cpf,
            "dataNsc": dataNsc,
            "telefone": telefone,
            "email": email,
            "senha": senha
        })

    } else {
        var nome = document.getElementById('inputNameCuid').value;
        var cpf = document.getElementById('inputCPFCuid').value;
        var dataNsc = document.getElementById('inputDataDeNascCuid').value;
        var genero = document.getElementById('inputGeneroCuid').value;
        var endereco = document.getElementById('inputEnderecoCuid').value;
        var telefone = document.getElementById('inputTelefoneCuid').value;
        var user = 'cuidador'

        var payloadJSON = JSON.stringify({
            "nome": nome,
            "cpf": cpf,
            "genero": genero,
            "dataNsc": dataNsc,
            "telefone": telefone,
            "endereco": endereco,
            "email": email,
            "senha": senha
        })
    }

    if (senha != repetirSenha) {
        window.alert('As senhas devem ser identicas!');
        return;
    }

    if (!VerificaCPF((cpf).replace(/[.]+/g, '').replace(/[-]+/g, ''))){
        window.alert('Esse CPF não é válido!');
        return;
    }
    
    if (!TestaData(dataNsc)) {
        window.alert('Essa data é inválida!');
        return;
    }

    var payloadJSONVerif = JSON.stringify({cpf: cpf})
    var verif = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSONVerif,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then(data => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data.paciente).length !== 0 || Object.keys(data.data.responsavel).length !== 0 || Object.keys(data.data.cuidador).length !== 0){
            window.alert('Ja existe uma conta com esse CPF');
            throw new Error("Cadastro repetido");
        }
    })

    var payloadJSONVerif = JSON.stringify({email: email})
    var verif = await fetch(`${URL_API}/user/email`, {
        method: 'POST',
        body: payloadJSONVerif,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then(data => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data.paciente).length !== 0 || Object.keys(data.data.responsavel).length !== 0 || Object.keys(data.data.cuidador).length !== 0){
            window.alert('Ja existe uma conta com esse Email');
            throw new Error("Cadastro repetido");
        }
    })

    await fetch(`${URL_API}/cadastro/${user}`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });

    var date = new Date();
    date.setDate(date.getDate() + 2);

    var userInfoStr = btoa(payloadJSON)
    document.cookie = `user=${userInfoStr};expires=${date.toUTCString()};path=/;`;
    
    window.location.href = `login${user}.html`
});

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