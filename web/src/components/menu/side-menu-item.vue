<template>
  <Submenu :name="`${parentItem.id}`">
    <template slot="title">
      <Icon :type="parentItem.icon || ''"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in parentItem.children">
      <side-menu-item v-if="showChildren(item)" :key="`menu-${item.id}`" :parent-item="item"></side-menu-item>
      <menu-item v-else :name="item.id" :key="`menu-${item.id}`"><Icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
    </template>
  </Submenu>
</template>
<script>
import mixins from './mixins'
export default {
  name: 'SideMenuItem',
  mixins: [ mixins ],
  props: ['parentItem']
}
</script>