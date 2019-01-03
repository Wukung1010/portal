<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :active-name="activeName" :open-names="openNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.id}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="item.id" :key="`menu-${item.id}`"><Icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </Menu>
  </div>
</template>

<script>
import SideMenuItem from './side-menu-item.vue'
import mixins from './mixins'
export default {
  mixins: [ mixins ],
  props: ['menuList', 'activeName', 'openNames'],
  data () {
    return {
      theme: 'dark',
      accordion: true
    }
  },
  methods: {
    handleSelect () {
      this.$emit('changeMenu', ...arguments)
    }
  },
  watch: {
    openNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  components: { SideMenuItem }
}
</script>

<style lang="less">
@import './menu.less';
</style>
