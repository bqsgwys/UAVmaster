try {

  const rosnodejs = require('rosnodejs');
  const player = require("./player");
  const db = require("./db");
  const initros = async () => {
    let nh = await rosnodejs.initNode("judger");
    let list = await db.list
    for (x of list) {
      gp(x).init(nh);
    }
  }
  rosnodejs.initNode("judger")
  const gp = (g) => ({
    id: g,
    timer: 0,
    init(nh) {
      nh.subscribe(`/${g}/ready`, 'std_msgs/Bool', (msg) => {
        console.log(`${g}Should be ready as ${msg.data}`);
        if (msg.data) player.ready(g);
      });
      nh.subscribe(`/${g}/takeoff`, 'std_msgs/Bool', (msg) => {
        if (msg.data) {
          player.takeoff(g);
          if (this.timer == 0) {
            let pub = nh.advertise(`/${g}/received`, 'std_msgs/Bool');
            pub.publish({
              data: true
            });
            this.timer = setInterval(() => {
              pub.publish({
                data: true
              });
            }, 2000);
          }
        }

      });
      nh.subscribe(`/${g}/seenFire`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenFire(g, msg.data);
      });
      nh.subscribe(`/${g}/seenTar1`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenTar1(g, msg.data);
      });
      nh.subscribe(`/${g}/seenTar2`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenTar2(g, msg.data);
      });
      nh.subscribe(`/${g}/seenTar3`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenTar3(g, msg.data);
      });
      nh.subscribe(`/${g}/done`, 'std_msgs/Bool', (msg) => {
        if (msg.data) {
          player.done(g, msg.data);
          clearInterval(this.timer);
        }
      });
    }
  })
  initros();
  module.exports = {
    nh: rosnodejs.nh,
    gp
  }
} catch (e) {
  console.log(e);
  module.exports = {
    nh() {},
    gp() {
      return ({
        init() {}
      })
    }
  }
}