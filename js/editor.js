const btnSave = document.getElementById('btnSave').addEventListener('click', () => {
    editor.save().then(data => {
        console.log(data)
    })
})