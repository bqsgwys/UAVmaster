try {
  const rosnodejs = require('rosnodejs');
  rosnodejs.initNode("judger");
  const player = require("./player");
  const db = require("./db");
  rosnodejs.initNode("judger")
  const gp = (g, gaim) => ({
    id: g,
    timer: 0,
    aim: gaim.mission.aims,
    start: 0,
    end() {
      if (this.start) {
        this.takeoff.shutdown();
        this.seenfire.shutdown();
        this.seenTar1.shutdown();
        this.seenTar2.shutdown();
        this.seenTar3.shutdown();
        this.done.shutdown();
        if (this.timer)
          clearInterval(this.timer);
      }
    },
    init(nh) {
      this.start = 1;
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
        if (this.pub)
          this.pub.publish({
            data: 1
          });
        if (this.target1)
          this.target1.publish({
            data: this.aim[0]
          });
        if (this.target2)
          this.target2.publish({
            data: this.aim[1]
          });
        if (this.target3)
          this.target3.publish({
            data: this.aim[2]
          });
      }, 2000);
      this.takeoff = nh.subscribe(`/${g}/takeoff`, 'std_msgs/Int16', (msg) => {
        if (msg.data) {
          this.aim = gaim.mission.aims;
          player.takeoff(g);
          if (!this.pub) {
            console.log('start')
            this.pub = nh.advertise(`/${g}/received`, 'std_msgs/Int16');
            this.pub.publish({
              data: 1
            });
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
        init() {},
        end() {}
      })
    }
  }
}
