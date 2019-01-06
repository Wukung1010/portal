<template>
  <Dropdown @on-click="click">
    <Button :icon="icon || defaultIcon"></Button>
    <DropdownMenu slot="list" style="width: 44px; overflow: hidden;">
      <DropdownItem v-for="(item, index) in icons" :name="item" :key="index"><Icon :type="item"/></DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  props: ['icon'],
  model: {
    prop: 'icon',
    event: 'change'
  },
  data () {
    return {
      defaultIcon: 'ios-paper-outline',
      icons: [
        'ios-paper-outline',
        'ios-add',
        'ios-alarm-outline',
        'ios-albums-outline',
        'ios-apps-outline',
        'ios-basket-outline',
        'ios-book-outline',
        'ios-browsers-outline',
      ]
    }
  },
  methods: {
    click (type) {
      this.$emit('change', type)
    }
  }
}
</script>

<style>

</style>
