<template>
  <TreeComponent :treeData="treeData" :selected="selected" :installedApps="installedApps" @addNode="addNode" @removeNode="removeNode" @select="selectNode"/>
</template>

<script>
import Vue from 'vue'
import TreeComponent from './treeComponent.vue'
export default {
  data () {
    return {
      selected: null,
      treeData: [
        {
          id: '1',
          title: 'root',
          isGroup: true,
          selected: true
        }
      ],
      installedApps: [
        { id: 1, name: '应用1'},
        { id: 2, name: '应用2'},
        { id: 3, name: '应用3'},
        { id: 4, name: '应用4'}
      ]
    }
  },
  methods: {
    addNode (node) {
      this.treeData.push(node)
    },
    removeNode (id) {
      let index = this.treeData.findIndex(node => node.id === id)
      if (index > -1) {
        this.treeData.splice(index, 1)
      }
    },
    selectNode (id) {
      let select = this.treeData.find(data => data.id === id)
      if (select) {
        this.selected = select
      }
    }
  },
  components: { TreeComponent }
}
</script>

<style>

</style>
