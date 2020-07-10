listPacientes = async () => {
    return new Promise (async (resolve) => {
        var user = document.getElementsByClassName('identificacao')[0].id;

        var payloadJSON = JSON.stringify({cpf: userInfo.cpf});

        var pacientes = await fetch(`${URL_API}/user/cpf`, {
            method: 'POST',
            body: payloadJSON,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
        await pacientes.json().then(async (data) => {
            if (data.data === undefined) {return;}
            if (Object.keys(data.data[user]).length == 0){
                window.location.href = 'index.html';
            } else {

                document.getElementById('outputNome').innerHTML = data.data[user][0].nome;
                document.getElementById('outputCPF').innerHTML = data.data[user][0].cpf;
                document.getElementById('outputTelefone').innerHTML = data.data[user][0].telefone;
                document.getElementById('outputDataNsc').innerHTML = data.data[user][0].dataNsc;

                if ((data.data[user][0].pacientes).length == 0) {
                    resolve(
                        `<div class="login">
                            <i class="paciente">
                                <ul><h3>Sem pacientes cadastrados</h3></ul>
                            </i>
                        </div>`);
                } else {
                    var info = "";
                    for (var paciente in data.data[user][0].pacientes) {
                        var payloadJSONPaciente = JSON.stringify({cpf: data.data[user][0].pacientes[paciente]});

                        var listaPacientes = await fetch(`${URL_API}/user/cpf`, {
                            method: 'POST',
                            body: payloadJSONPaciente,
                            headers: {"Content-Type": "application/json; charset=UTF-8"}
                        })
                        await listaPacientes.json().then(async (response) => {
                            var cpfEncoded = btoa(data.data[user][0].pacientes[paciente])
                            info +=
                                `<a href="paciente.html?c=${cpfEncoded}">
                                    <div class="login">
                                        <i class="paciente">
                                            <ul><i class="fa fa-user"></i>
                                                <h3>${response.data.paciente[0].nome}</h3>
                                            </ul>
                                        </i>
                                    </div>
                                </a>`
                        })
                    }
                    resolve(info);
                }
            }
        })
    })
}

document.addEventListener('readystatechange', async event => {
    var info = await listPacientes();
    if (event.target.readyState === "complete") {
        document.getElementById('listPaciente').innerHTML = info;
    }
});