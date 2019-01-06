const str = {
  TYPE_JS: 'js',
  TYPE_CSS: 'css',
  TYPE_PIC: 'pic'
}

class Loader {
  constructor () {
    this.jsDOMs = []
    return this
  }

  loadScript (arr, lastScriptCallback) {
    this.typesArray = {
      js: [],
      css: [],
      pic: []
    }
    arr.forEach(item => {
      this.typesArray[this.getTypes(item)].push(item)
    })

    this.loadJSScript(new ArrayGenerator(this.typesArray.js), lastScriptCallback)
    this.loadCSSScript(this.typesArray.css)
    this.loadPICScript(this.typesArray.pic)
  }

  loadCSSScript (arr) {
    let obj = {
      href: '',
      rel: 'stylesheet'
    }
    arr.forEach(item => {
      obj.href = this.url? this.url + '/' + item : item
      document.head.insertBefore(this.generateLinkDOM(obj), document.head.firstChild)
    })
  }

  loadPICScript (arr) {}

  loadJSScript (gene, lastScriptCallback) {
    if (!gene && !gene.next) {
      console.log('请传入一个可迭代对象')
    }
    let src = gene.next()
    let dom = {}
    if (!src.value) {
      return
    }
    if (!src.end) {
      dom = this.loadJS(src.value, () => {
        this.loadJSScript(gene, lastScriptCallback)
      })
    } else {
      dom = this.loadJS(src.value, lastScriptCallback)
      dom.addEventListener('load', () => {
        this.removeJSNode()
      })
    }
    this.jsDOMs.push(dom)
  }

  loadDOM (src) {

  }

  loadJS (src, callback) {
    let body = document.body
    let dom = this.generateJSDOM(src, callback)
    body.appendChild(dom)
    return dom
  }

  generateLinkDOM (obj) {
    let dom = document.createElement('link')
    Object.keys(obj).forEach(key => {
      dom[key] = obj[key]
    })
    return dom
  }

  generateJSDOM (src, onload) {
    let dom = document.createElement('script')
    dom.src = this.url? this.url + '/' + src: src
    dom.onload = onload
    return dom
  }

  getTypes (src) {
    let picReg = /\.(png|jpe?g|gif|webp)(\?.*)?$/
    let jsReg = /\.(js)(\?.*)?$/
    let cssReg = /\.(css)(\?.*)?$/

    if (jsReg.test(src)) return str.TYPE_JS
    if (cssReg.test(src)) return str.TYPE_CSS
    if (picReg.test(src)) return str.TYPE_PIC
    return null
  }

  removeJSNode () {
    this.jsDOMs.forEach(item => {
      document.body.removeChild(item)
    })
    this.jsDOMs.length = 0
  }

  setHttpUrl (url) {
    this.url = url
  }
}

class ArrayGenerator {
  constructor (array) {
    this._array = array
    this._index = -1
  }

  next () {
    if (this._index >= this._array.length - 1) {
      this._index = this._array.length - 1
    }
    return {
      value: this._array[++this._index],
      end: this._index >= this._array.length - 1
    }
  }

  previous () {
    if (this._index <= 0) {
      this._index = 0
    }
    return {
      value: this._array[--this._index],
      start: this._index <= 0
    }
  }
}

export default new Loader()
