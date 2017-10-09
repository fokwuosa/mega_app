const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/users';

let db;

function addUser(name, cb){
    
    getConnection().then((db) => {
        db.collection('users').insert( { name: name} );
        console.log("Added name: " + name);
        cb();
    })
}

function getUsers(cb){
    
    getConnection().then((db) => {
        db.collection('users').find({}).toArray(function (err, users) {
            if (err) return console.log(err);
            cb(users);
        })
    })
}


function getConnection(){
    if(db) {
        return Promise.resolve(db)
    }

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, database) {
            if (err) return reject(err);
            console.log("Connected successfully to server");
            //return resolve(random)
            db = database
            return resolve(database)
        });
    })
    
}

module.exports = {
    addUser : addUser,
    getUsers : getUsers
}