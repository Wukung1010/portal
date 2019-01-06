import { saveDataToLocalStorage, getDataFromLocalStorage } from '@/lib/tools'

const ID = 'portal_taglist'

const state = (() => {
  return getDataFromLocalStorage(ID) || {currentTag: {id: '1'}, tagList: [{id: '1', title: 'home', isDefault: true}]}
})()

const getters = {
  getCurrentTag (state) {
    return state.currentTag
  },
  getTagList (state) {
    return state.tagList
  }
}

const mutations = {
  addTag (state, tag) {
    let index = state.tagList.findIndex(t => t.id === tag.id)
    if (index === -1) {
      state.tagList.push(tag)
      saveDataToLocalStorage(ID, state)
    }
  },
  removeTag (state, tag) {
    let index = state.tagList.findIndex(t => t.id === tag.id)
    if (index > -1) {
      state.tagList.splice(index, 1)
      state.currentTag = state.tagList[--index]
      saveDataToLocalStorage(ID, state)
      return tag.id
    }
  },
  setCurrentTag (state, tag) {
    state.currentTag = tag
    saveDataToLocalStorage(ID, state)
  }
}

export default {
  state,
  getters,
  mutations
}
