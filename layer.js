var Layer = function(path, fn) {
  this.path = path
  this.name = fn.name
  this.handle = fn
}

// 校验layer层是否有处理函数
Layer.prototype.handle_request = function(req, res) {
  var fn = this.handle
  if (fn) {
    fn(req, res)
  }
}

// 校验layer层 路径和  外部传参路径是否一致
Layer.prototype.match = function(path) {
  return path === this.path
}

module.exports = Layer
