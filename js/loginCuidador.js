console.log(document.cookie)
var userInfo = document.cookie
console.log(userInfo);
userInfo = atob(userInfo.split('=')[1])
userInfoStr = JSON.stringify(userInfo)
console.log(userInfoStr)
userInfoParse = JSON.parse(userInfo)
console.log(userInfoParse)