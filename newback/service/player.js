const db = require("./db")
const {
  genmission
} = require("./mission")
const {
  say
} = require("./ws")

module.exports.gen = async (group, groupName) => {
  let l = await db.list;
  if (l.indexOf(group) == -1)
    l.push(group);
  await (db.list = l);
  await ((await db.rst)(group));
  g = (await db[group])
  g.name = groupName
  g.id = group
  g.mission = genmission();
  await (db[group] = g)
  say(group);
}

module.exports.ready = async (group) => {
  let g = (await db[group])
  if (!g.ready.finish) {
    g.ready.finish = true;
    g.ready.time = Date.now();
    await (db[group] = g)
    say(group);
  }
}

module.exports.takeoff = async (group) => {
  let g = (await db[group])
  if (!g.takeoff.finish) {
    g.takeoff.finish = true;
    g.takeoff.time = Date.now();
    await (db[group] = g)
    say(group);
  }
}

module.exports.seenFire = async (group, pos) => {
  let g = (await db[group])
  if (!g.seenFire.finish) {
    g.seenFire.finish = true;
    g.seenFire.time = Date.now();
    g.seenFire.correct = (`${pos}` == g.mission.Fire)
    await (db[group] = g)
    say(group);
  }
}

module.exports.seenTar1 = async (group, Tar1) => {
  let g = (await db[group])
  if (!g.seenTar1.finish) {
    g.seenTar1.finish = true;
    g.seenTar1.time = Date.now();
    g.seenTar1.correct = (`${Tar1}` == g.mission.Tar1)
    await (db[group] = g)
    say(group);
  }
}

module.exports.seenTar2 = async (group, Tar2) => {
  let g = (await db[group])
  if (!g.seenTar2.finish) {
    g.seenTar2.finish = true;
    g.seenTar2.time = Date.now();
    g.seenTar2.correct = (`${Tar2}` == g.mission.Tar2)
    await (db[group] = g)
    say(group);
  }
}

module.exports.seenTar3 = async (group, Tar3) => {
  let g = (await db[group])
  if (!g.seenTar3.finish) {
    g.seenTar3.finish = true;
    g.seenTar3.time = Date.now();
    g.seenTar3.correct = (`${Tar3}` == g.mission.Tar3)
    await (db[group] = g)
    say(group);
  }
}

module.exports.done = async (group) => {
  let g = (await db[group])
  if (!g.done.finish) {
    g.done.finish = true;
    g.done.time = Date.now();
    await (db[group] = g)
    say(group);
  }
}

module.exports.crush = async (group) => {
  let g = (await db[group])
  g.crush.push(Date.now())
  await (db[group] = g)
  say(group);
}

module.exports.show = async (group) => (await db[group])