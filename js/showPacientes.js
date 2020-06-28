listPacientes = async () => {
    var payloadJSON = JSON.stringify({cpf: userInfo.cpf});

    var pacientes = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await pacientes.json().then(async (data) => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data.responsavel).length == 0){
            window.location.href = 'https://lucasmodolo22.github.io/cuidadores';
        } else {
            if ((data.data.responsavel.pacientes).length == 0) {
                document.getElementById('listPacientes').innerHTML = 'Sem pacientes cadastrados!';
            } else {
                for (var paciente in data.data.responsavel.pacientes) {
                    var payloadJSONPaciente = JSON.stringify({cpf: data.data.responsavel.pacientes[paciente]});

                    var listaPacientes = await fetch(`${URL_API}/user/cpf`, {
                        method: 'POST',
                        body: payloadJSONPaciente,
                        headers: {"Content-Type": "application/json; charset=UTF-8"}
                    })
                    await listaPacientes.json().then(async (response) => {
                        document.getElementById('listPaciente').innerHTML += `<a href="paciente.html?cpf=${data.data.responsavel.pacientes[paciente]}"><div class="login"><i class="paciente"><ul><i class="fa fa-user"></i><h3>${response.data.paciente.nome}</h3></ul></i></div></a>`
                    })
                }
            }
        }
    })
}
listPacientes();