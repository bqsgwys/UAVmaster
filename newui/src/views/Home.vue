<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <div
          class="layout align-center fill-height column"
          style="padding-top: 250px;"
        >
          <div
            class="mb-5"
            style="color: black; position: relative; font-size: 24px; "
            @click="$router.push('../console')"
          >
            <div class="main-title" style="color: #F5B6DA; position: relative;">
              THU智能无人机挑战赛
            </div>
            <h2 style="color:  #F5B6DA;">2019 清华大学</h2>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style>
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
