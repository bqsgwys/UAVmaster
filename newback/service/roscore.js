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
  const gp = (g, gaim) => ({
    id: g,
    timer: 0,
    aim: gaim.missions.aims,
    start: 0,
    end() {
      if (start) {
        this.takeoff.shutdown();
        this.seenfire.shutdown();
        this.seenTar1.shutdown();
        this.seenTar2.shutdown();
        this.seenTar3.shutdown();
        this.done.shutdown();
        clearInterval(this.timer);
      }
    },
    init(nh) {
      this.start = 1;
      this.takeoff = nh.subscribe(`/${g}/takeoff`, 'std_msgs/Int16', (msg) => {
        if (msg.data) {
          this.aim = gaim.missions.aims;
          player.takeoff(g);
          if (this.timer == 0) {
            this.pub = nh.advertise(`/${g}/received`, 'std_msgs/Int16');
            this.pub.publish({
              data: true
            });
            this.target1 = nh.advertise(`/${g}/target1`, 'std_msgs/Int16');
            this.target1.publish({
              data: this.aim[0]
            });
            this.target2 = nh.advertise(`/${g}/target2`, 'std_msgs/Int16');
            this.target2.publish({
              data: this.aim[1]
            });
            this.target3 = nh.advertise(`/${g}/target3`, 'std_msgs/Int16');
            this.target3.publish({
              data: this.aim[2]
            });
            this.timer = setInterval(() => {
              pub.publish({
                data: true
              });
              this.target1.publish({
                data: this.aim[0]
              });
              this.target2.publish({
                data: this.aim[1]
              });
              this.target3.publish({
                data: this.aims[2]
              });
            }, 2000);
          }
        }

      });
      this.seenfire = nh.subscribe(`/${g}/seenfire`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenFire(g);
      });
      this.seenTar1 = nh.subscribe(`/${g}/seentarget1`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenTar1(g, msg.data);
      });
      this.seenTar2 = nh.subscribe(`/${g}/seentarget2`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenTar2(g, msg.data);
      });
      this.seenTar3 = nh.subscribe(`/${g}/seentarget3`, 'std_msgs/Int16', (msg) => {
        if (msg.data) player.seenTar3(g, msg.data);
      });
      this.done = nh.subscribe(`/${g}/done`, 'std_msgs/Int16', (msg) => {
        if (msg.data) {
          player.done(g, msg.data);
          clearInterval(this.timer);
        }
      });
    },
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