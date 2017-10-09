const express = require('express')
const pug = require('pug');

let app = express()
app.set('view engine', 'pug')

let users = [{name: "Faith"}, {name: "Tuffail"}];

app.get('/users', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Mega App listening on port 3000!')
})