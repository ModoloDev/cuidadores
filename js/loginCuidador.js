console.log(document.cookie)
var userInfo = document.cookie
console.log(userInfo);
userInfo = atob(userInfo.split('=')[1])
userInfo = JSON.stringify(userInfo)
console.log({info: userInfo})
