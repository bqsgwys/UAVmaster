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
          <span style="width:100%">
            <v-btn large text @click="checkSecret()"
              ><h2>比赛组</h2></v-btn
            ></span
          >
        </v-card-title>
        <v-card-text>
          <v-hover v-for="group in groupList" :key="group">
            <v-card pa-4 style="margin:15px auto">
              <v-btn style="width:100%" @click="$router.push(`/${group}`)">
                <h2>{{ group }}</h2>
              </v-btn>
              <v-divider></v-divider>
            </v-card>
          </v-hover>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    groupList: [],
    now: 0,
    time: 0
  }),
  created() {
    this.fetchGroup();
  },
  mounted() {},
  destroyed() {},
  methods: {
    async fetchGroup() {
      this.groupList = (await this.$http.get("/uav/groupList")).body;
    },
    async checkSecret() {
      let secret = prompt("Token please");
      if ((await this.$http.get(`/admin/${secret}`)).body) {
        this.$root.secret = secret;
        this.$router.push("/adm");
      }
    }
  }
};
</script>

<style></style>
