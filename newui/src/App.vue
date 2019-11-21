<template>
  <v-app>
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
    <router-view
      style="margin:3vh 3vw;height:94vh;width:94vw;max-width:100vw;max-height:100vh;"
    />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
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

.lizi {
  width: 100%;
  height: 100vh;
  position: fixed;
  float: left;
}
</style>
