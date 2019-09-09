const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
//const users = require('./routes/users')

const mongoose = require('mongoose');
const session = require('koa-session');


const routes = require('./routes')

mongoose.Promise = Promise;


var dbURL = 'mongodb://localhost/UAVC';
if (process.env.DBURL) {
  dbURL = process.env.DBURL;
}

mongoose.connect(dbURL, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log('Mongoose connection error: ' + err.message);
  } else {
    console.log('Mongoose connection succeed');
  }
});


// error handler
onerror(app)

// middlewares
app.use(koaBody({
  jsonLimit: "2mb",
  formLimit: "2mb",
  textLimit: "2mb",
}));
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${decodeURI(ctx.url)} - ${ms}ms`)
})

// routes
app.use(routes.routes(), routes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// session

app.keys = ['whysOSerioUs'];
const CONFIG = {
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

module.exports = app