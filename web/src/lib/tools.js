// 业务无关的工具
// 纯函数
// 脱离portal，可单独被引用、使用

/**
 * @description 保存数据到localstorage中
 * @param {string} id 
 * @param {object} data 
 */
export function saveDataToLocalStorage (id, data) {
  localStorage[id] = JSON.stringify(data)
}

/**
 * @description 从Localstorage中获取数据
 * @param {string} id 
 */
export function getDataFromLocalStorage (id) {
  let data = localStorage[id]
  if (data) {
    data = JSON.parse(data)
  }
  return data
}

/**
 * @description 设置cookies
 * @param {string} id 
 * @param {object|string|number} data 
 * @param {number} time 
 */
export function setCookies (id, data, time) {

}

/**
 * @description 获取cookies的值
 * @param {string} id 
 */
export function getCookies (id) {

}

/**
 * @description 生成新的GUID
 */
export function GUID () {
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
