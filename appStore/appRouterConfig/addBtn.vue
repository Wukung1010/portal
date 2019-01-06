<template>
  <Dropdown @on-click="click">
    <Button :type="btnType" :size="btnSize" :style="btnStyle"><Icon type="ios-add"/></Button>
    <DropdownMenu slot="list">
      <DropdownItem name="group">添加分组</DropdownItem>
      <DropdownItem name="single">添加项</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  props: ['options'],
  computed: {
    btnType () {
      return this.options.type || 'default'
    },
    btnSize () {
      return this.options.size || 'default'
    },
    btnStyle () {
      return this.options.style || {}
    }
  },
  methods: {
    click (type) {
      this.$emit('click', type)
    }
  }
}
</script>

<style>

</style>
