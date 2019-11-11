var myexpress = require('./test')
var app = new myexpress()

var res = app.route('/w').get(function(req, res) {
  res.end('get')
})
console.log('res: ', res)
// .get(function(req, res) {
//   res.end('rrrr')
// })
app.listen(3000)
