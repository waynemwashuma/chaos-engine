const { log } = require('console');
const express = require('express');
const app = express();
const path = require("path")
const http = require('http').createServer(app);
const PORT = 8080

app.use('/',express.static(__dirname + '/demos'))
app.use('/dist',express.static(__dirname + '/dist'))

http.listen(PORT, function () {
    console.log('listening on port::' + PORT);
})