const URL_API = 'http://localhost:3000'

document.getElementById('btnCadastro').addEventListener('click', async () => {

    var nome = "Teste1"
    var cpf = document.getElementById('inputCPF').value;
    var email = document.getElementById('inputEmail').value;
    var senha = document.getElementById('inputSenha').value;
    var repetirSenha = document.getElementById('inputRepetirSenha').value;
    var checkmarkPaciente = document.getElementById('checkmarkPaciente').checked;
    var checkmarkCuidador = document.getElementById('checkmarkCuidador').checked;

    if (nome == '' || cpf == '' || email == '' || senha == '' || repetirSenha == '' || (checkmarkPaciente == false && checkmarkCuidador == false)) {
        window.alert('Preencha todos os campos!');
        return;
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