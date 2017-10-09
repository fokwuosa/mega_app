const mongo = require('./mongo');

const express = require('express')
const pug = require('pug');

const app = express()
app.set('view engine', 'pug')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({    
  extended: true
})); 

app.use(express.urlencoded());

app.get('/users', function (req, res) {

    mongo.getUsers(function (users){
        res.render(
            'users',
            {"users" : users})
    });
})

app.post('/user', function(req, res){

    mongo.addUser(req.body.name);

    res.redirect('/users');
})

mongo.startDBServer(function () {
    app.listen(3000, function () {
        console.log('Mega App listening on port 3000!')
    })
});