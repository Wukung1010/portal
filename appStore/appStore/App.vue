<template>
  <div :class="app_box">
    <div class="app_info">
      <p class="app_info_title">{{app.name}}</p>
      <p>version：{{app.version}}    author：{{app.author}}</p>
    </div>
    <div class="app_operator">
      <Button v-if="app.isDefault" :type="btn_type" class="center unactive">默认应用不可删除</Button>
      <Button v-else :type="btn_type" class="center" @click="operator">{{this.actived?'刪除':'安装'}}</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['app', 'installedApps'],
  computed: {
    actived () {
      return this.installedApps.findIndex(a => a.id === this.app.id) > -1
    },
    'app_box' () {
      if (this.actived) {
        return 'app_box app_installed'
      } else {
        return 'app_box'
      }
    },
    'btn_type' () {
      if (this.actived) {
        return 'error'
      } else {
        return 'success'
      }
    }
  },
  methods: {
    operator () {
      this.$emit('click', this.app, this.actived)
    }
  }
}
</script>

<style scoped>
.app_box {
  width: 100%;
  height: 80px;
  border: 1px solid #eeeeee;
  border-radius: 3px;
  margin: 10px 0;
  padding: 5px;
}
.app_installed {
  background: #92f9921a;
}
.app_info {
  float: left;
  height: 100%;
  padding-left: 13px;
}
.app_info_title {
  font-size: 30px;
}
.app_operator {
  float: right;
  height: 100%;
  margin-right: 25px;
}
.center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.unactive {
  pointer-events: none;
  border-color: grey;
  background-color: grey;
}
</style>
