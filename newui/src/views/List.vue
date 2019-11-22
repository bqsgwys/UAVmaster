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
                    控制台
                  </h2>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <h2>
                    无人机大赛
                  </h2>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-spacer />
          <v-card outlined class="pa-4" style="height:75%;width:100%">
            <v-row
              no-gutters
              align="center"
              justify="center"
              style="height: 100%;width:100%;"
            >
              <v-col cols="12" sm="6" style="height:100%;">
                <v-btn
                  large
                  text
                  class="primary"
                  v-for="(pl, index) in groupAllList"
                  :key="index"
                  v-if="index % 2 == 0"
                  style="width:90%;margin:5px 0;font-size:1.1em;"
                  @click="$router.push(`/console/${pl.id}`)"
                  >{{ pl.id }}:{{ pl.name }}</v-btn
                >
              </v-col>
              <v-col cols="12" sm="6" style="height:100%;">
                <v-btn
                  large
                  text
                  class="primary"
                  v-for="(pl, index) in groupAllList"
                  :key="index"
                  v-if="index % 2"
                  @click="$router.push(`/console/${index}`)"
                  style="width:90%;margin:5px 0;font-size:1.1em;"
                  >{{ pl.id }}:{{ pl.name }}</v-btn
                >
              </v-col>
            </v-row></v-card
          >
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
          </v-card>
          <v-spacer />
          <v-card outlined class="pa-4" style="width: 100%;height: 20%;">
            <v-row
              no-gutters
              align="center"
              justify="center"
              style="height: 100%;width:100%;"
            >
              <v-col cols="12" sm="3" style="height:100%;"> </v-col>
              <v-col cols="12" sm="3" style="height:100%;"> </v-col>
              <v-col cols="12" sm="3" style="height:100%;"> </v-col>
              <v-col cols="12" sm="3" style="height:100%;"> </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "../assets/logo.png";
export default {
  components: {},
  data: () => ({
    groupList: [],
    groupAllList: [],
    Logo: "",
  }),
  created() {
    this.Logo = Logo;
  },
  watch: {
    $route() {
      // 对路由变化作出响应...
    },
  },
  computed: {},
  async mounted() {
    let vm = this;
    vm.groupList = (await vm.$http.get(encodeURI(`/api/list`))).body;
    vm.groupAllList = await Promise.all(
      vm.groupList.map(async (item) => {
        return await (await vm.$http.get(encodeURI(`/api/${item}`))).body;
      }),
    );
  },
  destroyed() {},
  methods: {},
};
</script>

<style>
.pa-4 {
  opacity: 0.98;
}
</style>
