<template>
  <Layout style="height: 100%">
    <Header style="background: #ffffff">
      <headComponent />
    </Header>
    <Layout style="height: 100%">
      <Sider>
        <menuComponent :menuList="getAppConfigTree()" :activeName="activeName" :openNames="openNames" @changeMenu="changeMenu"/>
      </Sider>
      <Content>
        <Layout style="height: 100%">
          <div style="height: 40px">
            <tag :list="getTagList()" :current="getCurrentTag()" @changeTag="changeTag" @closeTag="closeTag"/>
          </div>
          <Content style="height: calc(100% - 40px)">
            <ground :currentRouter="getCurrentRouter()" :installedApps="getInstalledApps()"/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import headComponent from '@/components/header'
import menuComponent from '@/components/menu'
import tag from '@/components/tagbar'
import ground from '@/components/ground'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    activeName () {
      let current = this.getCurrentMenu()
      if (current) {
        return current.id
      }
    },
    openNames () {
      let current = this.getCurrentMenu()
      let names = []
      let configs = this.$store.state.AppRouterConfigModule.configs
      current = configs.find(config => config.id === current.id)
      if (current && current.parent) {
        let mapper = {}
        configs.forEach(config => {
          mapper[config.id] = config
        })
        while (current.parent) {
          names.push(current.parent)
          current = mapper[current.parent]
        }
      }
      return names
    }
  },
  watch: {
    '$store.state.MenuModule.current' (newVal) {
      let router = this.getAppRouterConfig(newVal.id)
      this.setRouter(router)
    },
    '$store.state.TagModule.currentTag' (newVal) {
      let router = this.getAppRouterConfig(newVal.id)
      this.setRouter(router)
    }
  },
  methods: {
    ...mapGetters([
      'getCurrentRouter',
      'getCurrentTag',
      'getCurrentMenu',
      'getAppConfigTree',
      'getTagList',
      'getInstalledApps'
    ]),
    ...mapMutations([
      'setRouter',
      'addTag',
      'removeTag',
      'setCurrentTag',
      'setCurrentMenu'
    ]),
    turnToPage () {
      let currentRouter = this.getCurrentRouter()
      if (currentRouter.isDefault) {
        this.$router.push({
          name: currentRouter.name
        })
      } else {
        this.$router.push({
          path: `/app/${currentRouter.app}`
        })
      }
    },
    getAppRouterConfig (id) {
      let configs = this.$store.state.AppRouterConfigModule.configs
      return configs.find(config => config.id === id)
    },
    changeMenu (id, silence) {
      let router = this.getAppRouterConfig(id)
      let tag = {id: router.id, title: router.title, isDefault: router.isDefault}
      this.setCurrentMenu(tag)
      if (!silence) {
        this.addTag(tag)
        this.setCurrentTag(tag)
      }
    },
    changeTag (tag) {
      this.setCurrentTag(tag)
      this.setCurrentMenu(tag)
    },
    closeTag (tag) {
      this.removeTag(tag)
      let id = this.getCurrentTag().id
      this.changeMenu(id, true)
    }
  },
  components: { headComponent, menuComponent, tag, ground }
}
</script>

<style>

</style>
