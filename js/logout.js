document.getElementById('btnLogout').addEventListener('click', () => {
    document.cookie = 'user=undefined;';
    window.location.href = 'index.html';
})