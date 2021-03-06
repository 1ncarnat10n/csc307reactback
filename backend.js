const express = require('express');
const cors = require('cors');
const { response } = require('express');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function addUser(user){
    users['users_list'].push(user);
}

function randomID() {
    var id = '';
    var char = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charLength = char.length;
    for (var i = 0; i < 6; i++){
        id += char.charAt(Math.floor(Math.random() * charLength));
    }
    return id;
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByNameAndJob = (name, job) => { 
    return users['users_list'].filter( (user) => (user['name'] === name && user['job'] === job)); 
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        let index = users['users_list'].indexOf(result);
        users['users_list'].splice(index, 1);
        res.send("User removed");
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = randomID();
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   