var Layer = require('./layer')
var Route = function(path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

// 判断方法是否存在
Route.prototype._handles_method = function(method) {
  var name = method.toLowerCase()
  return Boolean(this.methods[name])
}

// 封装get请求,生成layer
Route.prototype.get = function(fn) {
  var layer = new Layer('/', fn)
  layer.method = 'get'

  this.methods['get'] = true
  this.stack.push(layer)

  return this
}

// 如果请求方法在数组,就分发执行item(layer)的回调函数
Route.prototype.dispatch = function(req, res) {
  var self = this,
    method = req.method.toLowerCase()

  for (let i = 0, len = self.stack.length; i < len; i++) {
    if (method === self.stack[i].method) {
      self.stack[i].handle_request(req, res)
    }
  }
}

module.exports = Route
