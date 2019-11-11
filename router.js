var Layer = require('./layer')
var Route = require('./route')
var Router = function() {
  this.stack = [
    new Layer('*', function(req, res) {
      res.end('404')
    }),
    new Layer('/', function(req, res) {
      res.end('home')
    })
  ]
}

Router.prototype.handle = function(req, res) {
  let router = this.stack
  for (let i = 0; i < router.length; i++) {
    if (router[i].match(req.url)) {
      router[i].handle_request(req, res)
    }
  }
  router[0].handle_request(req, res)
}

// 关键方法
// application->router(layer)->route->layer
/**
 * application:一个框架应用实例
 * router: application的路由管理实例,是一个stack,内部是layer层
 *
 */
Router.prototype.route = function(path) {
  var route = new Route(path)

  var layer = new Layer(path, function(req, res) {
    route.dispatch(req, res)
  })
  layer.route = route
  this.stack.push(layer)
  return route
}

Router.prototype.get = function(path, fn) {
  var route = this.route(path)
  route.get(fn)
  return this
}
module.exports = Router
