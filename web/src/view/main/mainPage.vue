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
            <tag :list="getTagList()" :current="getCurrentTag()" @changeTag="changeTag"/>
          </div>
          <Content style="height: calc(100% - 40px)">
            <ground :currentRouter="getCurrentRouter()"/>
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
  methods: {
    ...mapGetters([
      'getCurrentRouter',
      'getCurrentTag',
      'getCurrentMenu',
      'getAppConfigTree',
      'getTagList'
    ]),
    ...mapMutations([
      'setRouter',
      'addTag',
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
    changeMenu (id) {
      let router = this.getAppRouterConfig(id)
      this.setRouter(router)
      let tag = {id: router.id, title: router.title}
      this.addTag(tag)
      this.setCurrentTag(tag)
    },
    changeTag (tag) {
      let router = this.getAppRouterConfig(tag.id)
      this.setRouter(router)
      this.setCurrentTag(tag)
      this.setCurrentMenu(tag)
    }
  },
  components: { headComponent, menuComponent, tag, ground }
}
</script>

<style>

</style>
