$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
})

var cpfPaciente = $.getUrlVars()['c'];
cpfPaciente = atob(cpfPaciente);

infoPaciente = async (cpfPaciente) => {

    let payloadJSON = JSON.stringify({cpf: cpfPaciente})

    var paciente = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });
    await paciente.json().then((data) => {
        document.getElementById('outputNomePac').innerHTML = data.data.paciente.nome;
        document.getElementById('outputSexoPac').innerHTML = data.data.paciente.sexo;
        document.getElementById('outputEnderecoPac').innerHTML = data.data.paciente.endereco;
        document.getElementById('outputDataNscPac').innerHTML = data.data.paciente.dataNsc;
    })
}

getCuidador = async (cpfPaciente) => {

    var cuidadores = await fetch(`${URL_API}/cuidadores`, {
        method: 'POST',
        body: {}
        // headers: {"Content-Type": "application/json; charset=UTF-8"}
    });
    await cuidadores.json().then((data) => {
        for (var cuidador in data.data) {
            for (var listPaciente in data.data[cuidador].pacientes) {
                if (data.data[cuidador].pacientes[listPaciente] == cpfPaciente) {
                    document.getElementById('outputNomeCuid').innerHTML = data.data[cuidador].nome;
                    document.getElementById('outputDataNscCuid').innerHTML = data.data[cuidador].dataNsc;
                    document.getElementById('outputGeneroCuid').innerHTML = data.data[cuidador].genero;
                    document.getElementById('outputTelefoneCuid').innerHTML = data.data[cuidador].telefone;
                    return;
                }
            }
        }
    })
}

infoPaciente(cpfPaciente);
getCuidador(cpfPaciente);