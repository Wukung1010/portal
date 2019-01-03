<template>
  <div>
    {{JSON.stringify(currentRouter)}}
  </div>
</template>

<script>
export default {
  props: ['currentRouter'],
  watch: {
    currentRouter (newVal) {
      console.log(newVal)
    }
  }
}
</script>

<style>

</style>
