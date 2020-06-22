const URL_API = 'http://localhost:3000'

document.getElementById('btnCadastro').addEventListener('click', () => {

    const nome = "Teste1"
    const cpf = document.getElementById('inputCPF').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    const repetirSenha = document.getElementById('inputRepetirSenha').value;
    const checkmarkPaciente = document.getElementById('checkmarkPaciente').checked;
    const checkmarkCuidador = document.getElementById('checkmarkCuidador').checked;

    if (senha != repetirSenha) {
        window.alert('As senhas devem ser identicas!');
        return;
    }

    if (checkmarkPaciente) {
        user = 'paciente'
    } else {
        user = 'cuidador';
    };

    var payload = {
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "senha": senha
    }

    var payloadJSON = JSON.stringify(payload);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${URL_API}/cadastro/${user}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(payloadJSON);
});