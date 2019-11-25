<template>
  <v-container style="">
    <v-row no-gutters>
      <v-col cols="12" sm="3" lg="3" class="pa-4" style="height: 90vh">
        <v-row no-gutters align="center" justify="center" style="height: 100%;">
          <v-card outlined class="pa-4" style="height:15%;width:100%">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title
                  class="headline mb-1"
                  style="font-size: 1.45em!important"
                  ><h2>
                    {{ group }}
                  </h2>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <h2>{{ groupId }}</h2>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-spacer />
          <v-card outlined class="pa-4" style="height:75%;width:100%">
            <v-btn
              :class="ready ? 'light-green darken-2' : 'light-blue darken-2'"
              text
              width="90%"
              style="margin:5px;font-size: 1.2em;"
              @click="doneReady"
              >准备</v-btn
            >
            <v-btn
              :class="takeoff ? 'light-green darken-2' : 'light-blue darken-2'"
              text
              width="90%"
              style="margin:5px;font-size: 1.2em;"
              @click="doneTakeoff"
              >起飞</v-btn
            >
            <v-btn
              :class="seenFire ? 'light-green darken-2' : 'light-blue darken-2'"
              style="margin:5px;font-size: 1.2em;"
              text
              width="90%"
            >
              识别着火点
            </v-btn>
            <v-btn
              :class="
                seenTar1
                  ? seenTar1 == 1
                    ? 'red darken-2'
                    : 'light-green darken-2'
                  : 'light-blue darken-2'
              "
              style="margin:5px;font-size: 1.2em;"
              text
              width="90%"
            >
              识别目标一
            </v-btn>
            <v-btn
              :class="
                seenTar2
                  ? seenTar2 == 1
                    ? 'red darken-2'
                    : 'light-green darken-2'
                  : 'light-blue darken-2'
              "
              style="margin:5px;font-size: 1.2em;"
              text
              width="90%"
            >
              识别目标二
            </v-btn>
            <v-btn
              :class="
                seenTar3
                  ? seenTar3 == 1
                    ? 'red darken-2'
                    : 'light-green darken-2'
                  : 'light-blue darken-2'
              "
              style="margin:5px;font-size: 1.2em;"
              text
              width="90%"
            >
              识别目标三
            </v-btn>
            <v-btn
              :class="done ? 'light-green darken-2' : 'light-blue darken-2'"
              style="margin:5px;font-size: 1.2em;"
              text
              width="90%"
              @click="doneDone"
            >
              降落
            </v-btn>
            <v-card-title>失误</v-card-title>
            <v-btn
              :class="crush.length ? 'red darken-2' : 'light-green darken-2'"
              style="margin:5px;font-size: 1.2em;"
              text
              width="90%"
              @click="doneCrush"
            >
              碰撞{{ crush.length }}次
            </v-btn>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" sm="9" class="pa-4" style="height:90vh">
        <v-row
          no-gutters
          align="center"
          justify="center"
          style="height: 100%;width:100%;"
        >
          <v-card outlined class="pa-4" style="width: 100%;height: 70%;">
            <div
              class="main-title"
              large
              style="color: #E0F7FA;text-shadow:#E0F7FA 0px 0px 5px; position: relative;line-height: initial;"
            >
              <span>{{ status }}</span>
              <br />
              <span style="font-family:DSEG;">{{
                (timenow - (lastupdateTime ? lastupdateTime : timenow))
                  | date("mm:ss. SSS")
              }}</span>
              <br />
              <span style="font-family:DSEG;">
                {{ totScore }}
              </span>
            </div>
          </v-card>
          <v-spacer />
          <v-card outlined class="pa-4" style="width: 100%;height: 20%;">
            <v-row
              no-gutters
              align="center"
              justify="center"
              style="height: 100%;width:100%;"
            >
              <v-col cols="12" sm="3" style="height:100%;">
                <v-btn
                  class="red darken-2"
                  style="width:95%;height:100%;font-size:2em;font-weight:800;opacity:0.8;"
                  @click="fireHide = 0"
                >
                  火点 <br />{{ fireHide ? "隐藏" : Firepos }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" style="height:100%;">
                <v-btn
                  class="orange darken-2"
                  style="width:95%;height:100%;font-size:2em;font-weight:800;opacity:0.8;"
                  @click="tar1Hide = 0"
                >
                  {{
                    tar1Hide
                      ? "隐藏"
                      : !aims
                      ? "目标物体一"
                      : targetName[`${aims[0]}`]
                  }}<br />{{ tar1Hide ? "隐藏" : Tar1pos }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" style="height:100%;">
                <v-btn
                  class="lime darken-2"
                  style="width:95%;height:100%;font-size:2em;font-weight:800;opacity:0.8;"
                  @click="tar2Hide = 0"
                >
                  {{
                    tar2Hide
                      ? "隐藏"
                      : !aims
                      ? "目标物体二"
                      : targetName[`${aims[1]}`]
                  }}<br />{{ tar2Hide ? "隐藏" : Tar2pos }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" style="height:100%;">
                <v-btn
                  class="blue darken-2"
                  style="width:95%;height:100%;font-size:2em;font-weight:800;opacity:0.8;"
                  @click="tar3Hide = 0"
                >
                  {{
                    tar3Hide
                      ? "隐藏"
                      : !aims
                      ? "目标物体三"
                      : targetName[`${aims[2]}`]
                  }}<br />{{ tar3Hide ? "隐藏" : Tar3pos }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from "socket.io-client";
export default {
  components: {},
  data: () => ({
    ret: {},
    socket: {},
    timenow: 0,
    fireHide: true,
    tar1Hide: true,
    tar2Hide: true,
    tar3Hide: true,
    timer: null,
    group: "我们很队",
    groupId: 1,
    ready: false,
    takeoff: false,
    seenFire: 0,
    seenTar1: 0,
    seenTar2: 0,
    seenTar3: 0,
    fireHide: 1,
    tar1Hide: 1,
    tar2Hide: 1,
    tar3Hide: 1,
    crush: [],
    done: false,
    doneTime: 0,
    Firepos: 0,
    Tar1pos: 0,
    Tar2pos: 0,
    Tar3pos: 0,
    status: "PREPARING",
    lastupdateTime: 0,
    totScore: 0,
    groupList: [],
    groupObj: {},
    aims: [],
    targetName: {
      "1": "猫",
      "2": "文件",
      "3": "画作",
      "4": "婴儿",
      "5": "危险品",
    },
    deltaT: -1,
    end: 0,
  }),
  created() {},
  watch: {
    async $route() {
      // 对路由变化作出响应...
    },
    groupObj() {
      this.$nextTick(() => {
        let vm = this;
        vm.Firepos = vm.groupObj.mission.Fire;
        vm.Tar1pos = vm.groupObj.mission.Tar1;
        vm.Tar2pos = vm.groupObj.mission.Tar2;
        vm.Tar3pos = vm.groupObj.mission.Tar3;
        vm.aims = vm.groupObj.mission.aims;
        vm.group = vm.groupObj.name;
        vm.ready = vm.groupObj.ready.finish;
        vm.done = vm.groupObj.done.finish;
        vm.lastupdateTime = 0;
        if (vm.ready) {
          vm.lastupdateTime = vm.groupObj.ready.time;
          vm.status = "PREPARING";
        }
        vm.takeoff = vm.groupObj.takeoff.finish;
        if (vm.takeoff) {
          vm.lastupdateTime = vm.groupObj.takeoff.time;
          vm.status = "TAKEN OFF";
        }
        vm.seenFire = vm.groupObj.seenFire.finish;
        if (vm.seenFire) vm.status = "SEEN FIRE";

        vm.seenTar1 = vm.groupObj.seenTar1.finish;
        if (vm.seenTar1) {
          vm.seenTar1 += vm.groupObj.seenTar1.correct;
          vm.status = "SEEN TARGET 1";
          if (!vm.groupObj.seenTar1.correct) vm.status = "WRONG TARGET 3";
        }
        vm.seenTar2 = vm.groupObj.seenTar2.finish;
        if (vm.seenTar2) {
          vm.seenTar2 += vm.groupObj.seenTar2.correct;
          vm.status = "SEEN TARGET 2";
          if (!vm.groupObj.seenTar2.correct) vm.status = "WRONG TARGET 2";
        }
        vm.seenTar3 = vm.groupObj.seenTar3.finish;
        if (vm.seenTar3) {
          vm.seenTar3 += vm.groupObj.seenTar3.correct;
          vm.status = "SEEN TARGET 3";
          if (!vm.groupObj.seenTar3.correct) vm.status = "WRONG TARGET 3";
        }
        vm.crush = vm.groupObj.crush;
        vm.end = vm.groupObj.end;
        vm.totScore = vm.groupObj.score;
        clearInterval(vm.timer);
        if (vm.end) {
          vm.timenow = vm.end;
          vm.status = "EXIT";
        }
        if (vm.done) {
          vm.timenow = vm.groupObj.done.time;
          vm.status = "DONE";
        }
        if (!vm.done && !vm.end) vm.setTimer();
      });
    },
  },
  computed: {},
  async mounted() {
    window.scrollTo(0, 0);
    let vm = this;
    vm.groupId = vm.$route.params.group;
    vm.groupList = (await vm.$http.get(encodeURI(`/api/list`))).body;
    if (vm.groupList.indexOf(vm.groupId) == -1) {
      vm.$router.push(`/`);
    }
    vm.groupObj = (await vm.$http.get(encodeURI(`/api/${vm.groupId}`))).body;
    vm.socket = io({ query: { groupId: vm.groupId } });
    vm.socket.on("re", async (data) => {
      vm.groupObj = (await vm.$http.get(encodeURI(`/api/${vm.groupId}`))).body;
      vm.deltaT = data * 1 - Date.now();
    });
  },
  destroyed() {
    clearInterval(this.timer);
    this.socket.close();
  },
  methods: {
    setTimer: function() {
      let vm = this;
      vm.timer = setInterval(() => {
        vm.timenow = Date.now() + vm.deltaT;
      }, 17);
    },
    doneReady() {
      this.$http.get(encodeURI(`/api/ready/${this.groupId}`));
      this.fireHide = this.tar1Hide = this.tar2Hide = this.tar3Hide = 1;
    },
    doneTakeoff() {
      this.$http.get(encodeURI(`/api/takeoff/${this.groupId}`));
    },
    doneDone() {
      this.$http.get(encodeURI(`/api/done/${this.groupId}`));
    },
    doneCrush() {
      this.$http.get(encodeURI(`/api/crush/${this.groupId}`));
    },
  },
};
</script>

<style>
.pa-4 {
  opacity: 0.98;
}
</style>
