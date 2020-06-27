console.log(document.cookie)
var userInfo = document.cookie
console.log(userInfo);
userInfo = atob(userInfo.split('=')[1])
console.log(userInfo)
userInfo = JSON.parse(userInfo)
console.log(userInfo)

// var user = {
//     "data": {
//         "cuidador": {
//             "pacientes": [],
//             "_id": "5ef5744216cf1e52b4d62818",
//             "nome": "Cuidador dos Santos",
//             "cpf": "321.654.987-00",
//             "genero": "Feminino",
//             "dataNsc": "45/64/6565",
//             "telefone": "(97) 898798789",
//             "endereco": "longe pra caralho",
//             "email": "teste1@teste1.com.br",
//             "senha": "123",
//             "__v": 0
//         }
//     }
// }

// console.log(user)
// user = JSON.stringify(user)
// user = btoa(user)
// console.log(user)
// user = atob(user)
// console.log(JSON.parse(user))
