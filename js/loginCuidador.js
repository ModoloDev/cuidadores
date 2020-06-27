console.log(document.cookie)
var userInfo = document.cookie
console.log(userInfo);
userInfo = atob(userInfo.split('=')[1])
console.log({info: userInfo})
