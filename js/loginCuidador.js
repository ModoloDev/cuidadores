var userInfo = document.cookie.split(';')[1]
console.log(userInfo);
userInfo = atob(userInfo.split('=')[1])
console.log(userInfo)
