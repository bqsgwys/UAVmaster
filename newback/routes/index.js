const router = require('koa-router')()
const player = require('../service/player')
router.prefix("/api")
const checkAlive = async (ctx, next) => {
  let id = ctx.params.userId;
  if (await player.checkAlive(id)) {
    return next();
  } 
  return ctx.body = "failed";
}
router.get('/gen/:userId/:userName', async (ctx, next) => {
  let id = ctx.params.userId;
  let name = ctx.params.userName;
  await player.gen(id, name);
  return ctx.body = "success";
})

router.get('/ready/:userId/', async (ctx, next) => {
  let id = ctx.params.userId;
  await player.ready(id);
  return ctx.body = "success";
})
router.get('/takeoff/:userId/', checkAlive, async (ctx, next) => {
  let id = ctx.params.userId;
  await player.takeoff(id);
  return ctx.body = "success";
})

router.get('/seenFire/:userId', checkAlive, async (ctx, next) => {
  let id = ctx.params.userId;
  await player.seenFire(id);
  return ctx.body = "success";
})

router.get('/seenTar1/:userId/:pos', checkAlive, async (ctx, next) => {
  let id = ctx.params.userId;
  let pos = ctx.params.pos;
  await player.seenTar1(id, pos);
  return ctx.body = "success";
})

router.get('/seenTar2/:userId/:pos', checkAlive, async (ctx, next) => {
  let id = ctx.params.userId;
  let pos = ctx.params.pos;
  await player.seenTar2(id, pos);
  return ctx.body = "success";
})

router.get('/seenTar3/:userId/:pos', checkAlive, async (ctx, next) => {
  let id = ctx.params.userId;
  let pos = ctx.params.pos;
  await player.seenTar3(id, pos);
  return ctx.body = "success";
})

router.get('/done/:userId/', checkAlive, async (ctx, next) => {
  let id = ctx.params.userId;
  await player.done(id);
  return ctx.body = "success";
})

router.get('/crush/:userId/', async (ctx, next) => {
  let id = ctx.params.userId;
  await player.crush(id);
  return ctx.body = "success";
})

router.get('/:userId/', async (ctx, next) => {
  let id = ctx.params.userId;
  return ctx.body = await player.show(id);
})

module.exports = router