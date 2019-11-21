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

module.exports = async (group, groupName) => {
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
  try {
    gp(group).init(nh);
  }
  catch (e) {
    console.log(e);
  }
  say(group);
}