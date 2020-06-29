const URL_API = 'https://trabalhomodolo.rj.r.appspot.com'

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

                var date = new Date();
                date.setDate(date.getDate() + 2);

                if (Object.keys(user.data)[0] == 'cuidador') {
                    if (user.data.cuidador.senha == password) {

                        var userInfo = JSON.stringify(user.data.cuidador)
                        var userInfoStr = btoa(userInfo)

                        document.cookie = `user=${userInfoStr};expires=${date.toUTCString()};path=/;`;

                        window.location.href = 'logincuidador.html'
                        
                    } else {
                        window.alert('Senha incorreta');
                        return;
                    }
                } else {
                    if (user.data.responsavel.senha == password) {
                        
                        var userInfo = JSON.stringify(user.data.responsavel)
                        var userInfoStr = btoa(userInfo)

                        document.cookie = `user=${userInfoStr};expires=${date.toUTCString()};path=/;`;

                        window.location.href = 'loginresponsavel.html'

                    } else {
                        window.alert('Senha incorreta');
                        return;
                    }
                }
            });
        }
    });
});