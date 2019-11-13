var Route = require("./route");
var Layer = require("./layer");
var Router = function () {
  // 框架初始化路由,可以追加
  this.stack = [
    new Layer("*", function (req, res) {
      // 实现默认路由
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404, Cannot " + req.method + " " + req.url);
    }),
    new Layer("/", function (req, res) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("hello express");
    })
  ];
};

Router.prototype.handle = function (req, res) {
  var self = this;
  var method = req.method
  for (var i = 0, len = self.stack.length;i < len;i++) {
    if (self.stack[i].match(req.url)) {
      return self.stack[i].handle_request(req, res);
    }
  }
  return self.stack[0].handle_request(req, res);
};

/*
 * 关键方法
 * application->router->(layer)->route->layer(item)
 * application:一个框架应用实例
 * router: application的路由管理实例,是一个stack,内部是layer层
 */

Router.prototype.route = function (path) {
  var route = new Route(path);
  var layer = new Layer(path, function (req, res) {
    route.dispatch(req, res);
  });
  layer.route = route;
  this.stack.push(layer);
  return route;
};

Router.prototype.get = function (path, fn) {
  var route = this.route(path);
  route.get(fn);
  return this;
};

module.exports = Router;
