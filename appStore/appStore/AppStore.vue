<template>
  <div class="box">
    <div class="title">
      <h1>App Store
        <Icon class="refresh" type="md-refresh" @click="refleshApp"/>
      </h1>
    </div>
    <div class="table">
      <App v-for="(app, index) in apps" :app="app" :installedApps="installedApps" :key="index" @click="appOperator"/>
    </div>
  </div>
</template>

<script>
import App from './App.vue'
import { mapActions } from 'vuex'
export default {
  name: 'appStore',
  data () {
    return {
    }
  },
  computed: {
    apps () {
      let apps = this.$store.state.AppStoreModule.allApps
      if (apps.length > 0) {
        let result = []
        let mapper = []
        this.installedApps.forEach(installed => {
          mapper.push(installed.id)
          result.push(installed)
        })
        apps.forEach(app => {
          if (!mapper.includes(app.id)) {
            mapper.push(app.id)
            result.push(app)
          }
        })
        return result
      } else {
        return this.installedApps
      }
    },
    installedApps () {
      return this.$store.state.AppStoreModule.installedApps
    }
  },
  methods: {
    ...mapActions([
      'installApp',
      'uninstallApp',
      'searchAllApps'
    ]),
    refleshApp () {
      this.searchAllApps().then(data => {
        if (Array.isArray(data)) {
          //
        } else {
            this.$Message.error({
              data: data.message
            })
        }
      })
    },
    appOperator (app, actived) {
      if (actived) {
        this.uninstallApp(app).then(result => {
          this.$Message.info({
            content: result.message
          })
        })
      } else {
        this.installApp(app).then(result => {
          this.$Message.info({
            content: result.message
          })
        })
      }
    }
  },
  components: { App }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.table {
  width: 100%;
  height: calc(100% - 50px);
}
.refresh {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
  font-size: 20px;
}
.refresh:hover,
.refresh:active {
  opacity: 0.9;
}
</style>
