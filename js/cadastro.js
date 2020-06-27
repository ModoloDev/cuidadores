const URL_API = 'https://trabalhomodolo.rj.r.appspot.com'

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

    var payloadJSONVerif = JSON.stringify({cpf: cpf})
    var verif = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSONVerif,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then(data => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data).length !== 0){
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
        if (Object.keys(data.data).length !== 0){
            window.alert('Ja existe uma conta com esse Email');
            throw new Error("Cadastro repetido");
        }
    })

    fetch(`${URL_API}/cadastro/${user}`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });

    var date = new Date();
    date.setDate(date.getDate() + 2);

    var userInfo = JSON.stringify(payloadJSON)
    var userInfoStr = btoa(userInfo)

    document.cookie = `user=${userInfoStr};expires=${date.toUTCString()};path=/;`;

    window.location.href = `https://lucasmodolo22.github.io/cuidadores/login${user}`
});