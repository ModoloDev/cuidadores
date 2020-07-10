getInfoPaciente = async () => {
    return new Promise(async (resolve) => {

        var payloadJSON = JSON.stringify({cpf: cpfPaciente});

        var result = await fetch(`${URL_API}/user/cpf`, {
            method: 'POST',
            body: payloadJSON,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        });
        await result.json().then((data) => {
            resolve(data.data.paciente[0].info)
        })
    })
};

showInfo = async () => {
    var savedData = await getInfoPaciente();

    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {

            header: {
            class: Header,
            inlineToolbar: ['link'],
            config: {
                placeholder: 'Header'
            }
            },

            image: {
            class: SimpleImage,
            inlineToolbar: ['link'],
            },

            list: {
            class: List,
            inlineToolbar: true
            },

            checklist: {
            class: Checklist,
            inlineToolbar: true,
            },

            delimiter: Delimiter,
            inlineCode: {
            class: InlineCode
            },

            linkTool: LinkTool,
            embed: Embed,
            table: {
            class: Table,
            inlineToolbar: true
            }
        },
        data: savedData
    });

    document.getElementById('btnSave').addEventListener('click', async () => {
        editor.save().then(async data => {

            payloadJSON = JSON.stringify({
                cpf: cpfPaciente,
                info: data
            })
            console.log(payloadJSON)

            await fetch(`${URL_API}/save/info`, {
                method: 'POST',
                body: payloadJSON,
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            })
        })
    })
}
showInfo();