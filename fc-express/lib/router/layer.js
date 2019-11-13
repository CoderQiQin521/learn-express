// 基础(分层)数据结构
function Layer(path, fn) {
  this.path = path;
  this.name = fn.name || "<anonymous>";
  this.handle = fn;
}

// 校验layer层是否有处理函数
Layer.prototype.handle_request = function(req, res) {
  var fn = this.handle;
  if (fn) {
    fn(req, res);
  }
};

// 校验layer层 路径和  外部传参路径是否一致
Layer.prototype.match = function(path) {
  if (path === this.path) {
    return true;
  }
  return false;
};

module.exports = Layer;
