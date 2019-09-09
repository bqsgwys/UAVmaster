<template>
  <div id="app">
    <v-app>
      <router-view class="maincontainer" />
      <vue-particles
        color="#EEF"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="6"
        linesColor="#FFF"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.6"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
        style
      ></vue-particles>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: () => ({}),
  computed: {},
  created() {},
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #100020;
}
.maincontainer {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
}
.lizi {
  width: 100%;
  height: 100vh;
  position: fixed;
  float: left;
  top: 0;
  z-index: 0;
}
</style>
