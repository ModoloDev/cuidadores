const userInfo = document.cookie
userInfo = atob(userInfo.split('=')[1]).catch(() => {
    window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
})
userInfo = JSON.parse(userInfo).catch(() => {
    window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
})

const URL_API = 'https://trabalhomodolo.rj.r.appspot.com'

verificaUser = async () => {

    payloadJSON = JSON.stringify({cpf: userInfo.cpf}).catch(() => {
        window.location.href = 'https://lucasmodolo22.github.io/cuidadores'
    })

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
    })
    console.log('verificado')
}