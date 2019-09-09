<template>
  <v-container>
    <v-layout row wrap align-center justify-center fill-height text-xs-center>
      <v-flex xs12>
        <div>
          <div class="main-title" style="color: #E0F7FA; position: relative;">
            {{ groupName }}
          </div>
          <div
            class="main-title"
            large
            style="color: #E0F7FA;text-shadow:#E0F7FA 0px 0px 5px; position: relative;font-family:DSEG;"
          >
            {{ (timer - start + logx) | date("mm:ss") }} .
            {{ (timer - start + logx + "").slice(-3) }}
            <br />
            SCORE:{{ groupDetails.score }}
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-overlay :value="overlay">
      <div class="main-title dark" style="text-shadow:purple 0px 0px 10px;">
        <span style="white-space: pre-line;">{{ layoutText }}</span>
      </div>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    missions: {},
    groups: [],
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    groupName: "Group Container",
    start: 0,
    timer: 0,
    logx: new Date("2026-8-17 00:00:00.000").getTime(),
    groupDetails: {},
    overlay: false,
    layoutText: ""
  }),
  async created() {
    this.start = this.timer = Date.now();
    this.groupName = this.$route.params.group;
    this.groupDetails = (await this.$http.get(
      encodeURI(`/uav/${this.groupName}`)
    )).body;
    if (!this.groupDetails) this.$router.push("/");
    this.$options.timer = {};
    this.missions = (await this.$http.get("/uav/missionList")).body;
    this.groups = (await this.$http.get("/uav/groupList")).body;
    this.startTimer();
  },
  beforeDestroy() {
    for (let x in this.$options.timer) clearInterval(this.$options.timer[x]);
  },
  watch: {
    groupDetails(to, from) {
      if (!this.diff(from, to)) {
        if (from.startTimeStamp && to.lastAction && to.lastAction.mission) {
          this.overlay = true;
          this.layoutText = to.lastAction.extra;
          setTimeout(() => {
            this.overlay = false;
          }, 3000);
          if (to.lastAction.mission === "received") {
            this.start = Date.now();
          }
          if (to.lastAction.mission === "done") {
            this.stopTimer();
          }
        }
      }
    }
  },
  methods: {
    startTimer() {
      if (this.$options.timer.main) clearInterval(this.$options.timer.main);
      if (this.groupDetails.doneMission.received.length)
        this.start = new Date(
          this.groupDetails.doneMission.received[0]
        ).getTime();
      else this.start = Date.now();
      this.$options.timer.main = setInterval(this.chg, 39);
      this.$options.timer.updateInfo = setInterval(this.updateInfo, 1000);
    },
    chg() {
      this.timer = Date.now();
    },
    stopTimer() {
      if (this.$options.timer.main) clearInterval(this.$options.timer.main);
    },
    async updateInfo() {
      this.groupDetails = (await this.$http.get(
        encodeURI(`/uav/${this.groupName}`)
      )).body;
    },
    diff(obj1, obj2) {
      let o1 = obj1 instanceof Object;
      let o2 = obj2 instanceof Object;
      if (!o1 || !o2) return obj1 === obj2;
      if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
      for (let o in obj1) {
        let t1 = obj1[o] instanceof Object;
        let t2 = obj2[o] instanceof Object;
        if (t1 && t2) {
          if (!this.diff(obj1[o], obj2[o])) return false;
        } else if (obj1[o] !== obj2[o]) return false;
      }
      return true;
    }
  }
};
</script>

<style>
@font-face {
  font-family: "DSEG";
  font-style: normal;
  font-weight: light;
  src: url(../../public/fonts/DSEG14Modern-Light.woff2) format("woff2");
}
.main-title {
  font-size: 6rem;
  font-family: Teko, sans-serif;
  text-shadow: 5px 5px #000;
  text-transform: uppercase;
}

.sub-title {
  font-size: 3.5rem;
  font-family: Teko, sans-serif;
  text-shadow: 3px 3px #000;
  text-transform: uppercase;
}
</style>
