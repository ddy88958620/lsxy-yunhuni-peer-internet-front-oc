const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session-redis');
const index = require('./routes/index');
const config = require('./config')
// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));
app.keys = ['session.id'];
app.use(convert(session({
      store: {
        host: config.REDISHOST || '127.0.0.1',
        port: config.REDISPORT || 6379,
        ttl: 30*60, // 30*60
      }
    }
)));
app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// app.use(views(__dirname + '/views-ejs', {
//   extension: 'ejs'
// }));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(index.routes(), index.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.error('server error', err, ctx);
});

module.exports = app;
