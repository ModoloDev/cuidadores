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

if (userInfo.calendario == undefined) {
    document.getElementById('voltarId').href = 'loginresponsavel.html'
} else {
    document.getElementById('voltarId').href = 'logincuidador.html'
}

var cpfPaciente = $.getUrlVars()['c'];
cpfPaciente = atob(cpfPaciente);
document.getElementById('link').setAttribute("href", `adicionacuidador.html?c=${btoa(cpfPaciente)}`)

infoPaciente = async (cpfPaciente) => {

    let payloadJSON = JSON.stringify({cpf: cpfPaciente})

    var paciente = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });
    await paciente.json().then((data) => {
        document.getElementById('outputNomePac').innerHTML = data.data.paciente[0].nome;
        document.getElementById('outputSexoPac').innerHTML = data.data.paciente[0].sexo;
        document.getElementById('outputEnderecoPac').innerHTML = data.data.paciente[0].endereco;
        document.getElementById('outputDataNscPac').innerHTML = data.data.paciente[0].dataNsc;
    })
}

getCuidador = async (cpfPaciente) => {
    return new Promise (async (resolve) => {
        var info = "";
        var cuidadores = await fetch(`${URL_API}/cuidadores`, {
            method: 'POST',
            body: {}
        });
        await cuidadores.json().then((data) => {
            for (var cuidador in data.data) {
                for (var listPaciente in data.data[cuidador].pacientes) {
                    if (data.data[cuidador].pacientes[listPaciente] == cpfPaciente) {
                        info += 
                        `<div class="cuidador">
                            <div class="infocuidador">
                                <img src="img/avatar.png">
                                <p class="nomecuidador">${data.data[cuidador].nome}</p>
                                <div class="infocuidadormais" style="display:none;">
                                    <p class="adicionais">INFORMAÇÕES ADICIONAIS</p>
                                    <div class="infomais">
                                        <p>Data de Nascimento: ${data.data[cuidador].dataNsc}</p>
                                        <p>Gênero: ${data.data[cuidador].genero}</p>
                                        <p>Telefone: ${data.data[cuidador].telefone}</p>  
                                    </div>
                                    <div class="cuidadoradd">
                                        <a id="btnCuidadorRemove" title="Remover Cuidador" class=${btoa(data.data[cuidador].cpf)}><i class="fa fa-user-times"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                }
            }
        })
        resolve(info);
    })
}

document.addEventListener('readystatechange', async event => {
    await infoPaciente(cpfPaciente);
    var info = await getCuidador(cpfPaciente);
    
    if (event.target.readyState === "complete") {
        document.getElementById('showCuidador').innerHTML = info;
        $('.infocuidador').click(async function(){
            $(this).children('.infocuidadormais').first().toggle("slow", "swing");
            let cpf = atob($(this).children('.infocuidadormais').children('.cuidadoradd').children('#btnCuidadorRemove').attr('class'));
            await $(this).children('.infocuidadormais').children('.cuidadoradd').children('#btnCuidadorRemove').click(async() => {
                let payloadJSON = JSON.stringify({
                    cuidador: {
                        cpf: cpf
                    },
                    paciente: {
                        cpf: cpfPaciente
                    }
                })

                await fetch(`${URL_API}/remove/paciente`, {
                    method: 'POST',
                    body: payloadJSON,
                    headers: {"Content-Type": "application/json; charset=UTF-8"}
                }).then(() => {
                    window.alert('Cuidador Removido com sucesso!');
                    window.location.reload(true);
                })
            })
        });
        document.getElementById('loaderId').style["display"] = "none";
        document.getElementById("loginCard").style["display"] = "";
    }
});