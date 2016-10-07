<template>
  <div class="panel">
    <div class="panel-title">
      <div class="panel-name">Log</div>
      <div>
        <input placeholder="filter" v-model="expr">
      </div>
    </div>
    <div class="panel-body">
      <div class="log-item" v-for="log in filteredLogs">
        <a class="log-src" target="_blank" :href="'//' + log.src"> {{ log.src }}</a>
        <span class="log-content"> {{ log.content }} </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        expr: '',
        logs: []
      }
    },
    methods: {
      addLog: function (data) {
        data.content = data.content.toString()
        this.logs.push(data)
      }
    },
    computed: {
      filteredLogs() {
        var _this = this
        return this.logs.filter(function(logItem) {
          return logItem.content.indexOf(_this.expr) > -1
        })
      }
    },
    created: function () {
      window.bus.$on('log', this.addLog)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../libs/scss/variables.scss";

  .panel {
    flex-grow: 1;
    margin: 0.1rem;
    width: 3.8rem;
    border: 1px $color-blue solid;
  }

  .panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px $color-blue solid;
    font-family: $main-font-stack;
    font-size: 0.2rem;
    color: $color-white;
    background-color: $color-blue;
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
    color: $color-blue;
    border: 1px $color-blue solid;
    line-height: 0.2rem;
  }

  input {
    margin-right: 0.1rem;
    width: 1.2rem;
    border: 0;
    border-bottom: 1px $color-white solid;
    background-color: $color-blue;
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

  .log-item {
    border-left: 5px $color-blue solid;
    padding: 0.05rem;
    font-family: $code-font-stack;
    font-size: 0.12rem;
    color: $color-dark;
    margin: 0.15rem auto;
  }

  .log-src {
    color: $color-blue;
  }
</style>