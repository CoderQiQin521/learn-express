var Layer = require("./layer");
var Route = function (path) {
  this.path = path;
  this.stack = [];
  this.methods = {};
};

// route 是管理一个路径得各种请求方法得数据
/**
 * {
 * path: '/home',
 * stack: [
 * {
 * path: '/', //继承layer对象得path属性,无实际作用
 * method: 'get',
 * fn: function(req, res){
 *  ...
 * }
 * }
 * ]
 * }
 */

// 判断方法是否存在
Route.prototype._handles_method = function (method) {
  var name = method.toLowerCase();
  return Boolean(this.methods[name]);
};

// 封装get请求,生成layer(item)
Route.prototype.get = function (fn) {
  var layer = new Layer("/", fn);
  layer.method = "get";

  this.methods["get"] = true;
  this.stack.push(layer);

  return this;
};

// TODO: POST, DELETE... 

// 如果请求方法在数组,就分发执行item(layer)的回调函数
Route.prototype.dispatch = function (req, res) {
  var method = req.method.toLowerCase();
  for (let i = 0, len = this.stack.length;i < len;i++) {
    if (method === this.stack[i].method) {
      return this.stack[i].handle_request(req, res);
    }
  }
};

module.exports = Route;
