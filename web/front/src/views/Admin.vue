<template>
  <v-layout
    center
    row
    wrap
    align-center
    justify-center
    fill-height
    text-xs-center
  >
    <v-flex sm6 pa-2>
      <v-card class="dark">
        <v-card-title class="headline " primary-title>
          <span style="width:90%">
            <v-btn large text>
              <h2>比赛组</h2>
            </v-btn>
          </span>
          <span style="width:10%">
            <v-btn text small @click="add()"><v-icon>add</v-icon></v-btn>
          </span>
        </v-card-title>
        <v-card-text>
          <v-hover v-for="group in groupList" :key="group">
            <v-card pa-4 style="margin:15px auto">
              <v-btn style="width:100%" @click="$router.push(`/adm/${group}`)">
                <h2>{{ group }}</h2>
              </v-btn>
              <v-divider></v-divider>
            </v-card>
          </v-hover>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-flex>
    <v-overlay :value="overlay">
      <div class="main-title dark" style="text-shadow:purple 0px 0px 10px;">
        <span style="white-space: pre-line;">{{ layoutText }}</span>
      </div>
    </v-overlay>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    groupList: [],
    layoutText: "",
    overlay: false
  }),
  async created() {
    if (this.$route.params.pass) {
      this.$root.secret = this.$route.params.pass;
      this.$router.push("/adm");
    }
    if (
      !this.$root.secret ||
      !(await this.$http.get(`/admin/${this.$root.secret}`)).body
    ) {
      this.$router.push("/");
    }
    this.fetchGroup();
  },
  mounted() {},
  destroyed() {},
  methods: {
    async add() {
      let groupName = prompt("请输入组名(UTF-8非符号字符)");
      this.layoutText = (await this.$http.post(`/uav/${encodeURI(groupName)}`, {
        secret: this.$root.secret
      })).body;
      this.overlay = true;
      setTimeout(() => {
        this.overlay = false;
      }, 2000);
    },
    async fetchGroup() {
      this.groupList = (await this.$http.get("/uav/groupList")).body;
    }
  }
};
</script>

<style></style>
