<template>
  <div class="configBox">
    <Form class='route-form' ref="form" :model="selfConfig" label-position="left" :label-width="120">
      <FormItem prop="title" label="名称">
        <Input v-model="selfConfig.title" placeholder="请输入名称" />
      </FormItem>
      <FormItem prop="icon" label="图标">
        <IconPicker v-model="selfConfig.icon" />
      </FormItem>
      <FormItem v-if="!selfConfig.isGroup" prop="openWay" label="打开方式">
        <RadioGroup v-model="selfConfig.openWay">
          <Radio label='FUNCTAB'>功能页签</Radio>
          <Radio label='OPENBLANK'>新页签</Radio>
          <Radio label='MODELWINDOW'>模态窗口</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="!selfConfig.isGroup" prop="app" label="搭载的组件">
        <Select v-model="selfConfig.component" placeholder="选择搭载的应用">
          <Option v-for="(item,index) in apps" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <Button type="primary" @click="save">save</Button>
    </Form>
  </div>
</template>

<script>
import IconPicker from './iconPicker.vue'
export default {
  props: ['data', 'apps'],
  computed: {
    selfConfig () {
      return Object.assign({}, this.data)
    }
  },
  methods: {
    save () {
      this.$emit('save', this.selfConfig)
    }
  },
  components: { IconPicker }
}
</script>

<style scoped>
.configBox {
  padding: 20px
}
</style>
