listPacientes = async () => {

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
            window.location.href = 'https://lucasmodolo22.github.io/cuidadores';
        } else {
            if ((data.data[user].pacientes).length == 0) {
                document.getElementById('listPaciente').innerHTML = '<div class="login"><i class="paciente"><ul><h3>Sem pacientes cadastrados</h3></ul></i></div></a>';
            } else {
                for (var paciente in data.data[user].pacientes) {
                    var payloadJSONPaciente = JSON.stringify({cpf: data.data[user].pacientes[paciente]});

                    var listaPacientes = await fetch(`${URL_API}/user/cpf`, {
                        method: 'POST',
                        body: payloadJSONPaciente,
                        headers: {"Content-Type": "application/json; charset=UTF-8"}
                    })
                    await listaPacientes.json().then(async (response) => {
                        var cpfEncoded = btoa(data.data[user].pacientes[paciente])
                        document.getElementById('listPaciente').innerHTML += `<a href="paciente.html?c=${cpfEncoded}"><div class="login"><i class="paciente"><ul><i class="fa fa-user"></i><h3>${response.data.paciente.nome}</h3></ul></i></div></a>`
                    })
                }
            }
        }
    })
}
listPacientes();