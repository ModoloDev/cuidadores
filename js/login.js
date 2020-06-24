//Button Function
// $(".fa-bars").click(function() {
//     if (idmySidenav.width() == 0){
//         $('.main').animate({left: '0'}, 'slow');
//         idmySidenav.width('49%');
//         idmySidenav.show(200);
//         classtextmysidenax.show();
//         // idopencloseli.animate.css('textShadow', '0 0 15px rgba(244, 0, 0, 0.71)');
//         idsaberbutton.removeClass('fa fa-arrow-circle-right').addClass('fa fa-arrow-circle-left');
//     }
//     else{
//         $('.main').animate({left: '25%'}, 'slow');
//         classtextmysidenax.hide("fast");
//         idmySidenav.width('0%');
//         idsaberbutton.removeClass('fa fa-arrow-circle-left').addClass('fa fa-arrow-circle-right');
//         idmySidenav.fadeOut("100");
//     }
// });

const URL_API = 'http://localhost:3000'

document.getElementById('entrar-id').addEventListener('click', async () => {

    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    if (email == '' || password == ''){
        window.alert('Preencha todos os campos');
        return;
    };

    var payloadJSON = JSON.stringify({email: email});

    await fetch(`${URL_API}/user/email`, {
        method: "POST",
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    }).then(async (response) => {
        if (response.status == 400) {
            window.alert('Nenhum cadastro encontrado com esse email');
            return;
        } else {
            await response.json().then((user) => {
                if (Object.keys(user.data)[0] == 'paciente') {
                    if (user.data.paciente.senha == password) {
                        console.log('paciente logado')
                        // redirect pagina do paciente
                    } else {
                        window.alert('Senha incorreta');
                        return;
                    }
                } else {
                    if (user.data.cuidador.senha == password) {
                        console.log('cuidador logado')
                        // redirect pagina cuidador
                    } else {
                        window.alert('Senha incorreta');
                        return;
                    }
                }
            });
        }
    });
});