<template>
  <div class="panel">
    <div class="panel-title">
      <div class="panel-name">Error</div>
      <div>
        <input placeholder="filter" v-model="expr">
      </div>
    </div>
    <div class="panel-body">
      <!--<div class="err-item" v-for="error in errors | filterBy content in 'expr'">-->
      <div class="err-item" v-for="error in filteredErrors">
        <a class="err-src" target="_blank" :href="error.src">{{ error.srcShort }}:{{ error.lineNo }}</a>
        <span class="err-content"> {{ error.content }} </span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {
        expr: '',
        errors: []
      }
    },
    methods: {
      addErr: function (data) {
        var srcTmp = data.src.split('/');
        data.srcShort = srcTmp[srcTmp.length - 1]
        if (data.srcShort.length == 0) {
          data.srcShort = '(inline)'
        }
        this.errors.push(data)
      }
    },
    computed: {
      filteredErrors() {
        var _this = this
        return this.errors.filter(function(errItem) {
          return errItem.content.indexOf(_this.expr) > -1
        })
      }
    },
    created: function () {
      window.bus.$on('error', this.addErr)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../libs/scss/variables.scss";

  .panel {
    flex-grow: 1;
    margin: 0.1rem;
    width: 3.8rem;
    border: 1px $color-purple solid;
  }

  .panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px $color-purple solid;
    font-family: $main-font-stack;
    font-size: 0.2rem;
    color: $color-white;
    background-color: $color-purple;
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
    color: $color-purple;
    border: 1px $color-purple solid;
    line-height: 0.2rem;
  }

  input {
    margin-right: 0.1rem;
    width: 1.2rem;
    border: 0;
    border-bottom: 1px $color-white solid;
    background-color: $color-purple;
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

  .err-item {
    border-left: 5px $color-purple solid;
    padding: 0.05rem;
    font-family: $code-font-stack;
    font-size: 0.12rem;
    color: $color-dark;
    margin: 0.15rem auto;
  }

  .err-src {
    color: $color-purple;
  }
</style>