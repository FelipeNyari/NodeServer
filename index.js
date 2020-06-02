const express = require('express');
const server = express();
server.use(express.json())

//Query params = ?teste=1
//Route params = /users/1
//Body Params = {"name": "Felipe Nyari", "email":"felipe.nyari@gmail.com"}

const users = ['Felipe Nyari', 'Adriano', 'Aline'];

const log = [];

//Middleware é uma função que manipula o REQUEST E RESPONSE de alguma
//e retorna uma resposta 

//Middleware Global
server.use((req, res, next)=>{
    console.time('Request')    
    log.push({'metodo':req.method,
              'URL': req.url,                          
    })
     next();
     console.timeEnd('Request');
})

//Routes Middlewares
function getUsers(req, res){
    return res.json(users);
}
function getLog(req, res){
    return res.json(log);
}
function getUser(req, res){
    // const queryParamNome = req.query.nome;
    // const routeParamId = req.params.id;
    const { index } = req.params; 
    return res.json(req.user)
}
function createUser(req, res){
    const { name }  = req.body;
    users.push(name);
    return res.json({message: "Usuário criado com sucesso"});
}
function editUser(req, res){
    const { index } = req.params;
    const { name } = req.body; 
    
    users[index] = name;

    return res.json(users);
}
function deleteUser(req, res){
    const { index } = req.params;
    users.splice(index, 1);
    return res.send();
}

//Validation Middlewares
function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error : 'User not found on request body'});
    }
    return next();
}

function checkUserInArray(req, res, next){
    const user = users[req.params.index];

    if(!user){
        return res.status(400).json({error : 'User does not exists'});
    }
    req.user = user;

    return next();
}

server.get('/users', getUsers);
server.get('/log', getLog);
server.get('/users/:index', checkUserInArray, getUser);
server.post('/users', checkUserExists, createUser);
server.put('/users/:index',checkUserInArray,  editUser);
server.delete('/users/:index',checkUserInArray, deleteUser);

server.listen(3000);