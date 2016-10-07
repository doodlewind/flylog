<template>
  <div class="panel">
    <div class="panel-title">
      <div class="panel-name">Performance</div>
    </div>
    <div class="panel-body">
      <div class="perf-item" v-for="perf in performances">
        <a class="perf-src" target="_blank" :href="'//' + perf.src">{{ perf.src }}</a>
        <br>
        <span class="perf-name">UA: </span>
        <span class="perf-content"> {{ perf.ua }}</span>
        <br>
        <span class="perf-name">IP: </span>
        <span class="perf-content"> {{ perf.ip }}</span>
        <br>
        <span class="perf-name">DNS lookup: </span>
        <span class="perf-content">{{ perf.content.lookupDomain }}ms</span>
        <br>
        <span class="perf-name">URL redirect: </span>
        <span class="perf-content">{{ perf.content.redirect }}ms</span>
        <br>
        <span class="perf-name">Time to first byte:</span>
        <span class="perf-content">{{ perf.content.ttfb }}ms</span>
        <br>
        <span class="perf-name">Request start to response end: </span>
        <span class="perf-content">{{ perf.content.request }}ms</span>
        <br>
        <span class="perf-name">DOM ready: </span>
        <span class="perf-content">{{ perf.content.domReady }}ms</span>
        <br>
        <span class="perf-name">Full page load: </span>
        <span class="perf-content">{{ perf.content.loadFullPage }}ms</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        performances: []
      }
    },
    methods: {
      addPerformance: function (data) {
        this.performances.push(data)
      }
    },
    created: function () {
      window.bus.$on('performance', this.addPerformance)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../libs/scss/variables.scss";

  .panel {
    flex-grow: 1;
    margin: 0.1rem;
    width: 3.8rem;
    border: 1px $color-cyan solid;
  }

  .panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px $color-cyan solid;
    font-family: $main-font-stack;
    font-size: 0.2rem;
    color: $color-white;
    background-color: $color-cyan;
    height: 0.5rem;
  }

  .panel-name {
    text-indent: 0.1rem;
  }

  select {
    width: 0.8rem;
    text-indent: 0.08rem;
    height: 0.3rem;

    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0;
    background-color: $color-white;

    font-family: "AgencyFB", sans-serif;
    font-size: 0.2rem;
    color: $color-cyan;
    border: 1px $color-cyan solid;
    line-height: 0.2rem;
  }

  input {
    margin-right: 0.1rem;
    width: 1.2rem;
    border: 0;
    border-bottom: 1px $color-white solid;
    background-color: $color-cyan;
    font-family: $main-font-stack;
    font-size: 0.2rem;
    height: 0.3rem;
    color: $color-white;
  }
  ::-webkit-input-placeholder {
    color: $color-white;
  }
  ::-moz-placeholder {
    color: $color-white;
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: $color-white;
    opacity: 1;
  }

  .panel-body {
    height: 5rem;
    overflow-y: auto;
  }

  .perf-item {
    border-left: 5px $color-cyan solid;
    padding: 0.05rem;
    font-family: $code-font-stack;
    font-size: 0.12rem;
    color: $color-dark;
    margin: 0.15rem auto;
  }

  .perf-src, .perf-name {
    color: $color-cyan;
  }

  .perf-content {
    color: $color-dark;
  }
</style>
