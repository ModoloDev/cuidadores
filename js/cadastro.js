const URL_API = 'http://localhost:3000'

document.getElementById('btnCadastro').addEventListener('click', async () => {

    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputSenha').value;
    var repetirSenha = document.getElementById('inputRepetirSenha').value;
    var checkmarkPaciente = document.getElementById('checkmarkPaciente').checked;

    if (checkmarkPaciente) {
        var nomeResp = document.getElementById('inputNomeResp').value;
        var cpfResp = document.getElementById('inputCPFResp').value;
        var telefoneResp = document.getElementById('inputTelefonePac').value;
        var nomePac = document.getElementById('inputNomePac').value;
        var cpfPac = document.getElementById('inputCPFPac').value;
        var dataNascPac = document.getElementById('inputDataDeNascPac').value;
        var sexoPc = document.getElementById('inputSexoPac').value;
        var enderecoPac = document.getElementById('inputEnderecoPac').value;
        var user = 'paciente'
    } else {
        var nomeCuid = document.getElementById('inputNameCuid').value;
        var cpfCuid = document.getElementById('inputCPFCuid').value;
        var dataNascCuid = document.getElementById('inputDataDeNascCuid').value;
        var generoCuid = document.getElementById('inputGeneroCuid').value;
        var enderecoCuid = document.getElementById('inputEnderecoCuid').value;
        var telefoneCuid = document.getElementById('inputTelefoneCuid').value;
        var user = 'cuidador'
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
        if (Object.keys(data.data).length !== 0){
            window.alert('Ja existe uma conta com esse CPF ou Email');
            throw new Error("Cadastro repetido");
        }
    })

    if (checkmarkPaciente) {var user = 'paciente'} else {var user = 'cuidador'};

    var payloadJSON = JSON.stringify({
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "senha": senha
    });

    fetch(`${URL_API}/cadastro/${user}`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });

    // redirect pagina ${user}
});