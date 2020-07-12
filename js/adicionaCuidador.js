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

getCuidador = async (cpfPaciente) => {

    var cuidadores = await fetch(`${URL_API}/cuidadores`, {
        method: 'POST',
        body: {}
    });
    await cuidadores.json().then((data) => {
        for (var cuidador in data.data) {
            document.getElementById('showCuidador').innerHTML += 
            `<div class="cuidador">
                <div class="infocuidador">
                    <img src="img/avatar.png">
                    <p class="nomecuidador">${data.data[cuidador].nome}</p>
                    <!-- <div class="cuidadormais down">
                        <i class="fa fa-caret-square-down"></i>
                    </div>
                    <div class="cuidadormais up" style="display:none;">
                        <i class="fa fa-caret-square-up"></i>
                    </div> -->
                    <div class="infocuidadormais" style="display:none;">
                        <p class="adicionais">INFORMAÇÕES ADICIONAIS</p>
                        <div class="infomais">
                            <p>Data de Nascimento: ${data.data[cuidador].dataNsc}</p>
                            <p>Genero: ${data.data[cuidador].genero}</p>
                            <p>Telefone: ${data.data[cuidador].telefone}</p>  
                        </div>
                        <div class="cuidadoradd">
                            <a id="btnCuidador" class=${btoa(data.data[cuidador].cpf)}><i class="fa fa-user-plus"></i></a>
                        </div>
                    </div>
                </div>
            </div>`
        }
    })
    $('.infocuidador').click(async function (){
        $(this).children('.infocuidadormais').first().toggle("slow", "swing");
        var cpf = atob($(this).children('.infocuidadormais').children('.cuidadoradd').children('#btnCuidador').attr('class'));
        await $(this).children('.infocuidadormais').children('.cuidadoradd').children('#btnCuidador').click(async() => {
            var payloadJSON = JSON.stringify({
                cuidador: {
                    cpf: cpf
                },
                paciente: {
                    cpf: cpfPaciente
                }
            })

            await fetch(`${URL_API}/adiciona/cuidador`, {
                method: 'POST',
                body: payloadJSON,
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            }).then(() => {
                window.location.href = `paciente.html?c=${btoa(cpfPaciente)}`
            })
        })
    });
}

updateList = () => {
    var input = document.getElementById("search-bar").value.toUpperCase();
    var lista = document.getElementById('showCuidador').getElementsByClassName('nomecuidador');
    for (var i in lista){
        if (lista[i].innerHTML != undefined) {
            var textContent = lista[i].innerHTML.toUpperCase()
            var listaDiv = document.getElementsByClassName('cuidador');
            if (textContent.indexOf(input) > -1){
                listaDiv[i].style.display = ''
            } else {
                listaDiv[i].style.display = 'none';
            }
        }
    }
}
getCuidador(cpfPaciente);