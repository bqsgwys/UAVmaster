const router = new require('koa-router')();
const UAVSrv = require("../service/uav");
const {
  checkAdmin
} = require("./checkAdmin");

const {
  nameValidator,
  mission: {
    missionDetails
  }
} = require("../config");

router.get('/ranklist', async (ctx) => {
  ctx.status = 200;
  ctx.body = await UAVSrv.getRanklist();
  return;
});

router.get('/groupList', async (ctx) => {
  ctx.status = 200;
  ctx.body = await UAVSrv.getList();
  return;
});
router.get('/missionList', async (ctx) => {
  ctx.status = 200;
  ctx.body = missionDetails;
  return;
});

router.post('/:groupName', async (ctx) => {
  const groupName = ctx.params.groupName;
  if (nameValidator(groupName))
    if (!(await UAVSrv.getByName(groupName)))
      if (await UAVSrv.init(groupName)) {
        ctx.status = 201;
        ctx.body = `成功创建组${groupName}`;
        return;
      }
  ctx.status = 400;
  ctx.body = "无效的名称或名称重复"
  return;
});

router.get('/:groupName', async (ctx) => {
  ctx.status = 200;
  let ret = await UAVSrv.getByName(ctx.params.groupName)
  //console.log(ret)
  return ctx.body = ret;
});

router.put('/:groupName/mission', async (ctx) => {
  const groupName = ctx.params.groupName;
  await UAVSrv.resetMission(groupName);
  ctx.body = "重置成功";
  ctx.status = 200;
  return;
});

router.post('/:groupName/seenFire', async (ctx) => {
  const groupName = ctx.params.groupName;
  const group = await UAVSrv.getByName(groupName);
  const [x, y] = [
    ctx.request.body.x,
    ctx.request.body.y
  ]
  if (!group) {
    ctx.status = 400;
    ctx.body = "无效的组名"
    return;
  }
  const matchInfo = group.matchInfo;
  if (x == matchInfo.firePosition.x && y == matchInfo.firePosition.y) {
    await UAVSrv.finishMissionByName(groupName, "recogniseBurn");
    await UAVSrv.finishMissionByName(groupName, "feedbackBurn");
    await UAVSrv.lastAction(groupName, "feedbackBurn", 1, `在位置(${x},${y})找到燃烧物`);
    ctx.status = 200;
    ctx.body = "找到失火点！"
    return;
  } else {
    await UAVSrv.lastAction(groupName, "feedbackBurnFailed", 0, `在位置(${x},${y})没有找到燃烧物`);
    ctx.status = 404;
    ctx.body = "寻找失败！"
    return;
  }
});

router.post('/:groupName/seen/:target', async (ctx) => {
  const groupName = ctx.params.groupName;
  const target = ctx.params.target;
  const group = await UAVSrv.getByName(groupName);
  const position = ctx.request.body.position;
  if (!group) {
    ctx.status = 400;
    ctx.body = "无效的组名"
    return;
  }
  const matchInfo = group.matchInfo;
  for (let index in matchInfo.targets) {
    let data = matchInfo.targets[index];
    if (target == data.targetName && position == data.position) {
      await UAVSrv.finishMissionByName(groupName, "recogniseItem");
      await UAVSrv.finishMissionByName(groupName, "feedbackItem");
      await UAVSrv.lastAction(groupName, "feedbackItem", index, `在位置${position}找到${target}`);
      ctx.status = 200;
      ctx.body = `找到物品${target}！`;
      return;
    }
  }
  await UAVSrv.lastAction(groupName, "feedbackItem", 0, `在位置${position}没有找到${target}`);
  ctx.status = 404;
  ctx.body = "寻找失败！"
  return;
});

router.post('/:groupName/:mission', async (ctx) => {
  const {
    groupName,
    mission
  } = ctx.params;
  if (await UAVSrv.finishMissionByName(groupName, mission)) {
    ctx.status = 201;
    if (mission === "crush")
      await UAVSrv.lastAction(groupName, mission, 1, `${groupName} 发生了碰撞\n可惜了`);
    else if (mission === "done")
      await UAVSrv.lastAction(groupName, mission, 1, `${groupName} 比赛结束\n`);
    else if (mission === "landing") {
      await UAVSrv.finishMissionByName(groupName, "done")
      await UAVSrv.lastAction(groupName, mission, 1, `${groupName} 成功落地\n比赛结束\n`);
    } else
      await UAVSrv.lastAction(groupName, mission, 1, `${groupName} \n完成${missionDetails[mission].description}`);
    ctx.body = `${ctx.params.groupName}成功完成任务:${missionDetails[mission].description}`;
    return;
  }
  ctx.status = 400;
  ctx.body = "无效的组名或任务名"
  return;
});

module.exports = router;