const db = require("./db")
const {
  genmission
} = require("./mission")
const {
  say
} = require("./ws")
const {
  nh,
  gp
} = require("./roscore")

const list = {};

const scoring = (g) => {
  g.score = 0;
  if (g.takeoff.finish)
    g.score += 10;
  if (g.seenFire.finish) g.score += 20;
  if (g.seenTar1.finish && g.seenTar1.correct) g.score += 20;
  if (g.seenTar2.finish && g.seenTar2.correct) g.score += 20;
  if (g.seenTar3.finish && g.seenTar3.correct) g.score += 20;
  if (g.done.finish) g.score += 10;
}
module.exports.scoring = scoring;

module.exports.gen = async (group, groupName) => {
  let l = await db.list;
  if (l.indexOf(group) == -1)
    l.push(group);
  await (db.list = l);
  await ((await db.rst)(group));
  g = (await db[group]);
  g.name = groupName;
  g.id = group;
  g.end = 0;
  g.score = 0;
  g.mission = genmission();
  await (db[group] = g)
  if (list[`${group}`])
    list[`${group}`].end();
  say(group);
}

module.exports.ready = async (group) => {
  let g = (await db[group])
  await ((await db.rst)(group));
  g.ready.finish = true;
  g.ready.time = Date.now();
  scoring(g);
  await (db[group] = g)
  if (list[`${group}`])
    list[`${group}`].end();
  list[`${group}`] = gp(group, g)
  list[`${group}`].init(nh);
  say(group);
}

module.exports.exit = async (group) => {
  if (list[`${group}`])
    list[`${group}`].end();
  let g = (await db[group])
  g.end = Date.now();
  await (db[group] = g)
  return;
}

module.exports.seen = (group, target) => {
  if (list[`${group}`])
    list[`${group}`].seen(target, nh);
}
module.exports.fail = async (group) => {
  if (list[`${group}`])
    list[`${group}`].failure(nh);
  let g = (await db[group])
  g.end = Date.now();
  await (db[group] = g)
}