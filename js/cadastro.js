const URL_API = 'http://localhost:3000'

document.getElementById('btnCadastro').addEventListener('click', async () => {

    const nome = "Teste1"
    const cpf = document.getElementById('inputCPF').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    const repetirSenha = document.getElementById('inputRepetirSenha').value;
    const checkmarkPaciente = document.getElementById('checkmarkPaciente').checked;
    const checkmarkCuidador = document.getElementById('checkmarkCuidador').checked;

    if (nome == '' || cpf == '' || email == '' || senha == '' || repetirSenha == '' || (checkmarkPaciente == false && checkmarkCuidador == false)) {
        window.alert('Preencha todos os campos!');
        return;
    }

    if (senha != repetirSenha) {
        window.alert('As senhas devem ser identicas!');
        return;
    }

    if (checkmarkPaciente) {
        user = 'paciente';
        let verif = await verificaCadastroRepetido(cpf, 'cuidador')
        if (verif && verif != undefined) {
            window.alert('Ja existe uma conta com esse CPF ou Email');
            return;
        }
    } else {
        user = 'cuidador';
        let verif = await verificaCadastroRepetido(cpf, 'paciente')
        if (verif && verif != undefined) {
            window.alert('Ja existe uma conta com esse CPF ou Email');
            return;
        }
    }

    var payload = {
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "senha": senha
    }

    var payloadJSON = JSON.stringify(payload);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            // redireciona pra prox pagina
        }
        if (this.status == 400) {
            window.alert('Ja existe uma conta com esse CPF ou Email');
            return;
        }
    };

    xhr.open("POST", `${URL_API}/cadastro/${user}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(payloadJSON);
});

async function verificaCadastroRepetido (cpf, user) {

    var promise = new Promise(function (resolve, rejected) {
        var xhr = new XMLHttpRequest();

        payload = {
            cpf: cpf
        }

        var payloadJSON = JSON.stringify(payload);

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
        
            if (this.status == 200) {
                var data = JSON.parse(this.responseText);
                if (Object.keys(data).length === 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        };

        xhr.open("POST", `${URL_API}/${user}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(payloadJSON);
    })
    return promise;
}