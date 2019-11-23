<template>
  <v-container style="">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="3"
        lg="3"
        class="pa-4"
        style="height: 90vh"
        v-for="line in [0, 1, 2, 3]"
        :key="line"
      >
        <v-row no-gutters align="center" justify="center" style="height: 100%;">
          <v-btn
            large
            text
            class="primary"
            v-for="(pl, index) in groupAllList"
            :key="index"
            v-if="index % 4 == line"
            :style="{
              width: '90%',
              margin: '5px 0',
              fontSize: '1.5em',
              height:`calc( 80vh / ${Math.ceil(groupAllList.length / 4)})`,
              opacity:0.85
            }"
            @click="$router.push(`/console/${pl.id}`)"
            >{{ pl.id }}:{{ pl.name }}</v-btn
          >
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
