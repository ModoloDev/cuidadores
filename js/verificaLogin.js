const URL_API = 'https://cuidadores-api-gnoik7og5a-uw.a.run.app'

var userInfo = document.cookie
try {
    userInfo = atob(userInfo.split('=')[1])
    userInfo = JSON.parse(userInfo)
} catch(error) {
    window.location.href = 'index.html'
}

var user = document.getElementsByClassName('identificacao')[0].id;

verificaUser = async (userInfo, user) => {

    try {
        payloadJSON = JSON.stringify({cpf: userInfo.cpf})
    } catch {
        window.location.href = 'index.html'
    }

    var verif = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then(data => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data).length == 0) {
            window.location.href = 'index.html'
        }
        if (user == 'cuidador') {
            if (data.data.cuidador === undefined) {
                window.location.href = 'index.html'
            }
        } else if (user == 'responsavel') {
            if (data.data.responsavel === undefined) {
                window.location.href = 'index.html'
            }
        }
    })
}

verificaUser(userInfo, user);
console.log('verificado')