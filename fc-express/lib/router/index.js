var Layer = require('./layer')
var Router = function() {
  this.stack = [
    new Layer('*', function(req, res) {
      // 实现默认路由
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404, Cannot ' + req.method + ' ' + req.url)
    }),
    new Layer('/', function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('hello express')
    })
  ]
}

Router.prototype.use = function(path, fn) {
  this.stack.push(new Layer(path, fn))
}

Router.prototype.handle = function(req, res) {
  var self = this,
    method = req.method
  for (var i = 0, len = self.stack.length; i < len; i++) {
    if (self.stack[i].match(req.url)) {
      return self.stack[i].handle_request(req, res)
    }
  }
  return self.stack[0].handle_request(req, res)
}

module.exports = Router
