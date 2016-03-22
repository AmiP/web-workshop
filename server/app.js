var express = require('express')
var app = express()
var Nedb = require('nedb')
var path = require('path')

app.use(express.static('../client'))

var planets = new Nedb({ filename: './data/data.db', autoload: true })

// Let's insert some data
planets.insert({ name: 'Earth', satellites: 1 }, function (err) {
  console.log('done!')
})

app.listen(8080)