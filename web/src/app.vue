<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html, body{
  .size;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.app{
  .size
}
</style>
