import vue from 'vue'
const safeGet = (obj, path) => {
  if (obj === undefined) return undefined
  const pathArr = path.split('.')
  let result = obj

  for (let i = 0; i < pathArr.length; i++) {
    if (result[pathArr[i]] === undefined) return undefined
    result = result[pathArr[i]]
  }
  return result
}

export default {
  install (Vue, options) {
    Vue.prototype.$safeGet = safeGet
  }
}

vue.filter('isHaveVal', val => {
  console.log(safeGet)
  console.log(val)
})
