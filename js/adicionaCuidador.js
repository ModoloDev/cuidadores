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

getCuidador = async () => {

    var cuidadores = await fetch(`${URL_API}/cuidadores`, {
        method: 'POST',
        body: {}
        // headers: {"Content-Type": "application/json; charset=UTF-8"}
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
                            <p>${data.data[cuidador].dataNsc}</p>
                            <p>${data.data[cuidador].genero}</p>
                            <p>${data.data[cuidador].telefone}</p>  
                        </div>
                        <div class="cuidadoradd">
                            <a><i class="fa fa-user-plus"></i></a>
                        </div>
                    </div>
                </div>
            </div>`
        }
    })
    $('.infocuidador').click(function(){
        $(this).children('.infocuidadormais').first().toggle("slow", "swing");
    });
}

updateList = () => {
    var input = document.getElementById("search-bar").value.toUpperCase();
    var lista = document.getElementById('showCuidador').getElementsByClassName('nomecuidador');
    for (var i in lista){
        var textContent = lista[i].innerHTML.toUpperCase();
        var listaDiv = document.getElementsByClassName('cuidador');
        if (textContent.indexOf(input) > -1){
            listaDiv[i].style.display = ''
        } else {
            listaDiv[i].style.display = 'none';
        }
    }

}
getCuidador();