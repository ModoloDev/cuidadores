var userInfo = document.cookie
try {
    userInfo = atob(userInfo.split('=')[1])
    userInfo = JSON.parse(userInfo)
} catch(error) {
    window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
}

var user = document.getElementById('cuidador');
if (user == null) {
    user = 'responsavel'
}

const URL_API = 'https://trabalhomodolo.rj.r.appspot.com'

verificaUser = async (userInfo, user) => {

    try {
        payloadJSON = JSON.stringify({cpf: userInfo.cpf})
    } catch {
        window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
    }

    var verif = await fetch(`${URL_API}/user/cpf`, {
        method: 'POST',
        body: payloadJSON,
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    await verif.json().then(data => {
        if (data.data === undefined) {return;}
        if (Object.keys(data.data).length == 0) {
            window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
        }
        if (user == 'cuidador') {
            if (data.data.cuidador === undefined) {
                window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
            }
        } else if (user == 'responsavel') {
            if (data.data.responsavel === undefined) {
                window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
            }
        }
    })
}

verificaUser(userInfo, user);
console.log('verificado')