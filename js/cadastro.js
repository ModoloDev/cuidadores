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