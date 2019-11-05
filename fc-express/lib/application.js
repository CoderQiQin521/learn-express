var http = require('http')
var Router = require('./router')
var Application = function() {
  this._router = new Router()
}

Application.prototype.use = function(path, fn) {
  return this._router.use(path, fn)
}

Application.prototype.handle = function(req, res) {
  var router = this._router
  return router.handle(req, res)
}

Application.prototype.listen = function(port, fn) {
  var self = this
  http
    .createServer(function(req, res) {
      self.handle(req, res)
    })
    .listen(port, fn)
}

module.exports = Application
