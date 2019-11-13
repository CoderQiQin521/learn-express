var http = require("http");
var Router = require("./router");
var Application = function () {
  this._router = new Router(); // 实例一个Router统一管理路由
};

Application.prototype.route = function (path, fn) {
  return this._router.route(path, fn);
};

Application.prototype.get = function (path, fn) {
  return this._router.get(path, fn);
};

Application.prototype.handle = function (req, res) {
  var router = this._router;
  return router.handle(req, res);
};

Application.prototype.listen = function (port, fn) {
  var self = this;
  http
    .createServer(function (req, res) {
      self.handle(req, res);
    })
    .listen(port, fn);
};

module.exports = Application;
