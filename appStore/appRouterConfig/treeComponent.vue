<template>
  <div class="box">
    <div class="title">
      <h1>应用路由配置</h1>
    </div>
    <div>
      <div class="left">
        <div>
          <AddBtn @click="addNode" :options="addBtnStyle" />
        </div>
        <div>
          <Tree :treeData="getAppConfigList()" :selected="getCurrentConfig()" @addNode="addNode" @removeNode="removeNode" @select="select" />
        </div>
      </div>
      <div class="right">
        <Config :data="getCurrentConfig()" :apps="getInstalledApps()" @save="updateConfig"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Config from './config.vue'
import Tree from './tree.vue'
import AddBtn from './addBtn.vue'
import mixins from './mixins'
export default {
  name: 'xftree',
  mixins: [mixins],
  data () {
    return {
      addBtnStyle: {
        type: 'primary',
        size: 'small',
        style: {
          width: '64px'
        }
      }
    }
  },
  computed: {
    installedApps () {

    }
  },
  methods: {
    ...mapGetters([
      'getAppConfigList',
      'getCurrentConfig',
      'getInstalledApps'
    ]),
    ...mapMutations([
      'setCurrentConfig',
      'deleteConfig',
      'insertConfig',
      'updateConfig'
    ]),
    addNode (type, parent) {
      let newNode = this.createNode()
      if (parent) {
        newNode.parent = parent
      }
      newNode.isGroup = type === 'group'
      this.insertConfig(newNode)
      this.select(newNode.id)
    },
    removeNode (id, parent) {
      this.select(parent || this.treeData[0].id)
      this.deleteConfig(id)
    },
    select (id) {
      this.setCurrentConfig(id)
    }
  },
  components: { Config, Tree, AddBtn }
}
</script>

<style lang="less">
@import "./treeComponent.less";
</style>
