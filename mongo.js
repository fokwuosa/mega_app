const MongoClient = require('mongodb').MongoClient
, assert = require('assert');

const url = 'mongodb://localhost:27017/users';

let db;

function addUser(name){
    db.collection('users').insert( { name: name} );
    console.log("Added name: " + name);
}

function getUsers(cb){
    db.collection('users').find({}).toArray(function (err, users) {
        if (err) return console.log(err);

        cb(users);
    })
}

function startDBServer(cb){
    MongoClient.connect(url, function(err, database) {
        if (err) return console.log(err);
        console.log("Connected successfully to server");
    
        db = database;
    
        cb();
    });
}

module.exports = {
    addUser : addUser,
    getUsers : getUsers,
    startDBServer : startDBServer
}