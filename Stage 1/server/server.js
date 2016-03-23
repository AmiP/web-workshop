var express = require('express')
var app = express()

app.use(express.static('../client'))

var PORT = 8080
app.listen(PORT)

console.log("listening on " + PORT)