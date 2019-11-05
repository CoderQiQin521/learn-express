function Layer(path, fn) {
  this.path = path
  this.name = fn.name || '<anonymous>'
  this.handle = fn
}

Layer.prototype.handle_request = function(req, res) {
  var fn = this.handle
  if (fn) {
    fn(req, res)
  }
}

Layer.prototype.match = function(path) {
  if (path === this.path) {
    return true
  }
  return false
}

module.exports = Layer
