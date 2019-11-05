var Route = function(path) {
  this.path = path
  this.stack = []
  this.mehods = {}
}

Route.prototype._handles_method = function(method) {
  var name = method.toLowerCase()
  return Boolean(this.mehods[name])
}

Router.prototype.get = function(fn) {
  var layer = new layer('/', fn)
  layer.method = 'get'

  this.mehods['get'] = true
  this.stack.push(layer)

  return this
}
