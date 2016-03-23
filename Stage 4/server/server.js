var express = require('express')
var app = express()
var Nedb = require('nedb')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('../client'))

var database = new Nedb({ filename: './data/data.db', autoload: true })

app.get('/getSaved', function (req, res) {
  database.find({}, function (err, data) {
    console.log('I just read stuff from the database')
    res.send(data)
  })
})

app.post('/saveCurrent', function (req, res) {
  database.insert(
  {
    word: req.body.word,
    date: Date.now()
  },
  function () {
    console.log('I just wrote to the database')
    res.end("done")
  })
})

var PORT = 8080
app.listen(PORT)

console.log("listening on " + PORT)