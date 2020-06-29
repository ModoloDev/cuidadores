document.getElementById('btnLogout').addEventListener('click', () => {
    document.cookie = undefined;
    window.location.href = 'index.html';
})