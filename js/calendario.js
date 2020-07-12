var identificacao = document.getElementsByClassName('identificacao')[0].id;
if (identificacao == 'ambos') {
    identificacao = 'paciente'
}

getCuidadoresObj = async () => {
    var obj = [];
    return new Promise (async (resolve) => {
        var cuidadores = await fetch(`${URL_API}/cuidadores`, {
            method: 'POST',
            body: {}
        });
        await cuidadores.json().then((data) => {
            for (var cuidador in data.data) {
                obj.push({ value: data.data[cuidador].cpf, text: data.data[cuidador].nome})
            }
        })
        resolve(obj)
    })
}

var cuidObj = [];
getCuidadoresObj().then(data => {
    cuidObj = data;
});

LoadCalendario = async (callback) => {

    try {
        var cpf = cpfPaciente
    } catch {
        var cpf = userInfo.cpf
    }

    payloadJSON = JSON.stringify({cpf: cpf});

    var user = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await user.json().then(data => {
        if (identificacao == 'paciente') callback(data.data.paciente[0].calendario)
        else callback(JSON.stringify(data.data.cuidador[0].calendario))
    })
}

load = async () => {
	await LoadCalendario(response => {
		calendar.schedule.fromJson(response)
	})
}

document.getElementById('loadButton').addEventListener('click', async () => {
    await load();
    document.getElementById('calendar').style['display'] = "";
})