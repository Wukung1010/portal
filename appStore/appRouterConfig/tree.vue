<template>
  <div>
    <Tree :data="selfTreeData" :render="treeRender"/>
  </div>
</template>

<script>
import AddBtn from './addBtn.vue'
import mixins from './mixins'
export default {
  mixins: [mixins],
  props: ['treeData', 'selected'],
  data () {
    return {
      btnProps: {
        type: 'default',
        size: 'small'
      }
    }
  },
  computed: {
    selfTreeData () {
      let tree = []
      let mapper = {}
      this.treeData.forEach(data => {
        let clone = Object.assign({}, data)
        mapper[clone.id] = clone
        if (!clone.parent) {
          tree.push(clone)
        }
      })
      Object.keys(mapper).forEach(key => {
        let data = mapper[key]
        if (data.parent) {
          let parent = mapper[data.parent]
          parent.children || (parent.children = [])
          parent.children.push(data)
        }
      })
      if (this.selected) {
        let id = this.selected.id
        let node = mapper[id]
        do {
          if (node.parent) {
            node = mapper[node.parent]
            node.expand = true
          } else {
            node = null
          }
        } while (node)
      }
      return tree
    }
  },
  methods: {
    treeRender (h, { root, data, node }) {
      let self = this
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', {
          style: {
            lineHeight: '23px',
            fontSize: '14px'
          }
        },[
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('div', {
            style: {
              display: 'inline-block',
              cursor: 'pointer',
              backgroundColor: (self.selected && self.selected.id === data.id) ? '#d5e8fc':'#ffffff',
              padding: '1px 10px',
              borderRadius: '5px'
            },
            on: {
              click () {
                self.select(data.id)
              }
            }
          },data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, this.getBtns(h, data))
      ])
    },
    addNode (data, type) {
      this.$emit('addNode', type, data.id)
    },
    removeNode (data) {
      this.$emit('removeNode', data.id, data.parent)
    },
    getBtns (h, data) {
      let self = this
      let btns = []
      btns.push(h('Button', {
            props: Object.assign({}, self.btnProps, {
              icon: 'ios-remove'
            }),
            style: {
              marginLeft: '8px'
            },
            on: {
              click () {
                self.removeNode(data)
              }
            }
          }
        )
      )

      data.isGroup && btns.unshift(h(AddBtn, {
            props: {
              options: {
                size: 'small'
              }
            },
            on: {
              click (type) {
                self.addNode(data, type)
              }
            }
          }
        )
      )
      data.children && data.children.length > 0 && btns.pop()
      return btns
    },
    select (id) {
      this.$emit('select', id)
    }
  }
}
</script>

<style>

</style>
