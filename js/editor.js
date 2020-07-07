const btnSave = document.getElementById('btnSave').addEventListener('click', () => {
    editor.save().then(data => {

        payloadJSON = JSON.stringify(data)
        console.log(payloadJSON)

        fetch(`${URL_API}/save/info`, {
            method: 'POST',
            body: payloadJSON,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
    })
})