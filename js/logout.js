document.getElementById('btnLogout').addEventListener('click', () => {
    document.cookie = 'user=;';
    window.location.href = 'index.html';
})