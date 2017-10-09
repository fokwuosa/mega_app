const express = require('express')
const pug = require('pug');

const app = express()
app.set('view engine', 'pug')

const MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/users';

let db;

app.get('/users', function (req, res) {

    const collection = db.collection('users');
    
    collection.find({}).toArray(function (err, users) {
        if (err) return console.log(err);
        console.log("Found the following records");
        console.log(users);

        res.render(
            'users',
            {"users" : users})
    })
})

MongoClient.connect(url, function(err, database) {
    if (err) return console.log(err);
    console.log("Connected successfully to server");

    db = database;

    app.listen(3000, function () {
        console.log('Mega App listening on port 3000!')
    })
});