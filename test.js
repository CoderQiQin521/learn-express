var http = require('http')
// 路由分层(app.use('/index')) 实例 Layer对象
var Layer = require('./layer')
var Router = require('./router')

var Application = function() {
  this.router = new Router()
}

Application.prototype.use = function(path, fn) {
  // this.router.push(new Layer(path, fn))
  //FIXME: 因为没有return返回 所有app.user().get(),可能不会生效
  this.router.use(path, fn)
}

Application.prototype.handle = function(req, res) {
  // let router = this.router
  // for (let i = 0; i < router.length; i++) {
  //   if (router[i].match(req.url)) {
  //     router[i].handle_request(req, res)
  //   }
  // }
  // router[0].handle_request(req, res)
  this.router.handle(req, res)
}

Application.prototype.route = function(path) {
  return this.router.route(path)
}

Application.prototype.listen = function(port) {
  var self = this
  http
    .createServer(function(req, res) {
      self.handle(req, res)
    })
    .listen(port)
}

module.exports = Application
