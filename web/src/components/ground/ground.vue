<template>
  <div>
    <component v-show="componentId" :is="componentId"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import loader from '@/lib/scriptloader'

loader.setHttpUrl('http://localhost:3000')
const emtiyPage = {
  render: h => h('div', { style: { padding: '40px', fontSize: '20px'} }, '未配置应用页面')
}
const FLAG = 'portal_application'
const appCache = {}

export default {
  data () {
    return {
      componentId: null
    }
  },
  props: ['currentRouter', 'installedApps'],
  watch: {
    currentRouter (newVal) {
      let appID = newVal.app
      if (appCache[appID]) {
        this.componentId = appID
      } else {
        let app = this.installedApps.find(app => app.id === appID)
        if (app) {
          loader.loadScript(app.url, () => {
            let component = window[FLAG].default || window[FLAG]
            appCache[appID] = component
            Vue.component(appID, component)
            this.componentId = appID
          })
        } else {
          this.componentId = emtiyPage
        }
      }
    }
  }
}
</script>

<style>

</style>
