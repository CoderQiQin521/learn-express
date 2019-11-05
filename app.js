var express = require('./fc-express')

var app = new express()

app.use('/haha', function(req, res) {
  res.end('hahaha')
})
app.listen(3000)
