<template>
  <nav>
    <div class="title">FlyLog</div>
    <div class="nav-item active">Admin</div>
    <div class="nav-item" onclick="window.open('/doc/README-cn.html')">Doc</div>
  </nav>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../libs/scss/variables.scss";

  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 0.5rem;
    width: 100%;

    display: flex;
    justify-content: flex-end;
    background-color: $color-blue;
  }

  .title, .nav-item {
    font-size: 0.2rem;
    font-family: $main-font-stack;
    font-weight: normal;
    color: $color-white;
  }

  .title {
    position: fixed;
    top: 0.15rem;
    left: 0.2rem;
  }

  .nav-item {
    width: 0.6rem;
    height: 0.5rem;

    text-align: center;
    line-height: 0.5rem;
    vertical-align: middle;
    cursor: pointer;
  }

  .nav-item.active {
    border-bottom: 4px $color-white solid;
  }
</style>