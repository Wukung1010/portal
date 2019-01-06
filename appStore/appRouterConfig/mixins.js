export default {
  methods: {
    createNode (type) {
      return {
        id: performance.now(),
        title: 'new Node',
        isGroup: type === 'group'
      }
    }
  }
}