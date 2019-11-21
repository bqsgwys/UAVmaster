const level = require("level")
const db = level('database', {
  valueEncoding: "json"
})

db.find = (key) => new Promise((res, rej) => {
  db.get(key, (err, data) => {
    if (err) return res(undefined);
    return res(data)
  })
})

const template = {
  name: "",
  id: 0,
  ready: {
    finish: false,
    time: 0,
  },
  takeoff: {
    finish: false,
    time: 0,
  },
  seenFire: {
    finish: false,
    correct: false,
    time: 0,
  },
  seenTar1: {
    finish: false,
    correct: false,
    time: 0,
  },
  seenTar2: {
    finish: false,
    correct: false,
    time: 0,
  },
  seenTar3: {
    finish: false,
    correct: false,
    time: 0,
  },
  done: {
    finish: false,
    time: 0,
  },
  crush: [],
  mission: {
    Fire: 0,
    Tar1: 0,
    Tar2: 0,
    Tar3: 0
  }
}

const gjr = {
  async rst(key) {
    await db.put(key, template)
    await (db[key] = template);
  }
}

const database = new Proxy(gjr, {
  async get(target, key) {
    if (key == 'rst') {
      return target.rst;
    }
    if (key == 'list') {
      let x = (await db.find('list'))
      if (x == undefined) {
        await db.put('list', [])
        return [];
      }
      return x;
    }
    let x = await db.find(key)
    if (!x) {
      await db.put(key, template)
      x = template;
    }
    return target[key] = x;
  },
  async set(target, key, value) {
    if (key == 'rst') return;
    await db.put(key, value)
  }
})


module.exports = database;