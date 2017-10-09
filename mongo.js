const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/users';

let db;

function addUser(name, cb){
    if (!db) {
        initDB();
    }
    db.collection('users').insert( { name: name} );
    console.log("Added name: " + name);

    cb();
}

function getUsers(cb){
    if (!db) {
        initDB();
    }
    db.collection('users').find({}).toArray(function (err, users) {
        if (err) return console.log(err);

        cb(users);
    })
}

function initDB(){
    MongoClient.connect(url, function(err, database) {
        if (err) return console.log(err);
        console.log("Connected successfully to server");
    
        db = database;
    });
}

module.exports = {
    addUser : addUser,
    getUsers : getUsers
}