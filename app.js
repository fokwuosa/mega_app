const express = require('express')
const pug = require('pug');

const app = express()
app.set('view engine', 'pug')

const MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/users';

let users = { users: [{name: "Faith"}, {name: "Tuffail"}] };

app.get('/users', function (req, res) { 

    // Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const collection = db.collection('users');

    collection.find({}).toArray(function (err, db_users) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(db_users);
        users = db_users;
    })
    
    db.close();
    });

    res.render(
        'users',
        users)
})

app.listen(3000, function () {
    console.log('Mega App listening on port 3000!')
})