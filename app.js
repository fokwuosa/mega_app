const mongo = require('./mongo');

const express = require('express')
const pug = require('pug');

const app = express()
app.set('view engine', 'pug')

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({    
  extended: true
})); 

app.use(express.json());
app.use(express.urlencoded());

app.get('/users', function (req, res) {

    mongo.getUsers(function (users){
        res.render(
            'users',
            {"users" : users})
    });
})

app.get('/api/users', function (req, res) {
    
    mongo.getUsers(function (users){
        res.json(users);
    });
})

app.post('/user', function(req, res){

    mongo.addUser(req.body.name, function() {
        res.redirect('/users');
    });
})

app.post('/api/user', function(req, res){
    
    mongo.addUser(req.body.name, function() {
        res.redirect('/users');
    });
})

app.listen(3000, function () {
    console.log('Mega App listening on port 3000!')
})