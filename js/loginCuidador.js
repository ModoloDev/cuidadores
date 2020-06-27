console.log(document.cookie)
var userInfo = document.cookie
console.log(userInfo);
userInfo = atob(userInfo.split('=')[1])
userInfoStr = JSON.stringify(userInfo)
console.log(userInfoStr.email)
console.log(userInfo.email)