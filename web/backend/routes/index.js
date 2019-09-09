const router = require('koa-router')()
const uav = require('./uav');
const {
  secret
} = require("../config");

router.use('/uav', uav.routes(), uav.allowedMethods());

router.get('/admin/:secret', async (ctx) => {
  if (ctx.params.secret == secret)
    return ctx.body = true;
  ctx.body = false;
  return;
})

router.post('/register', async (ctx, next) => {
  console.log("register");
  ctx.body = {
    title: 'testing'
  }
})

module.exports = router