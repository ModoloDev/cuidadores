var userInfo = atob(document.cookie.split(';'))
console.log(userInfo);
userInfo = userInfo.split('=')[1]
console.log(userInfo)
