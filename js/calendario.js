var identificacao = document.getElementsByClassName('identificacao')[0].id;
if (identificacao == 'ambos') {
    identificacao = 'paciente'
}

getCuidadoresObj = async (cpf) => {
    var obj = [];
    return new Promise (async (resolve) => {
        var cuidadores = await fetch(`${URL_API}/cuidadores`, {
            method: 'POST',
            body: {}
        });
        await cuidadores.json().then((data) => {
            for (var cuidador in data.data) {
                for (var i in data.data[cuidador].pacientes) {
                    if (data.data[cuidador].pacientes[i] == cpf) obj.push({ value: data.data[cuidador].cpf, text: data.data[cuidador].nome})
                }
            }
        })
        resolve(obj)
    })
}

try {
    var cpf = cpfPaciente
    var cuidObj = [];
    getCuidadoresObj(cpf).then(data => {
        cuidObj = data;
    });
} catch {
    var cpf = userInfo.cpf
}

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

document.getElementById( 'saveButton' ).addEventListener( 'click', async () => {

	try {
        var cpf = cpfPaciente
    } catch {
        var cpf = userInfo.cpf
    };

	payloadJSON = JSON.stringify({
		cpf: cpf,
		calendario: calendar.schedule.toJson()
	});

	await fetch(`${URL_API}/save/calendario/${identificacao}`, {
		method: 'POST',
		body: payloadJSON,
		headers: {"Content-Type": "application/json; charset=UTF-8"}
	});
});

document.getElementById('loadButton').addEventListener('click', () => {
    LoadCalendario(response => {
        calendar.schedule.fromJson(response);
	})
})