<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <performance-panel></performance-panel>
      <error-panel></error-panel>
      <log-panel></log-panel>
    </main>
    <network></network>
  </div>
</template>

<script>
  // enable vue devtools
  import Vue from 'vue'
  import * as NavBar from './NavBar.vue'
  import * as LogPanel from './LogPanel.vue'
  import * as ErrorPanel from './ErrorPanel.vue'
  import * as PerformancePanel from './PerformancePanel.vue'
  import * as Network from './Network.vue'

  // global data bus
  window.bus = new Vue()

  export default {
    name: 'FlyAdmin',
    components: {
      NavBar,
      LogPanel,
      ErrorPanel,
      PerformancePanel,
      Network
    }
  }
</script>

<style lang="scss">
  @import "../libs/scss/variables.scss";

  @font-face {
    font-family: "AgencyFB";
    src: url("/libs/font/AgencyFB.woff") format("woff");
  }
  @font-face {
    font-family: "monaco";
    src: url("/libs/font/monaco.woff") format("woff");
  }

  * {
    box-sizing: border-box;
  }
  html {
    font-size: 625%;
  }
  body {
    font-size: 0.16rem;
    background-color: $color-white;
    padding-top: 0.5rem;
  }
  main {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    max-width: 14rem;
  }
</style>