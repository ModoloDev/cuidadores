const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', event =>{
    console.log(event.target.files[0])
});