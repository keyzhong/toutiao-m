/**
 * 初始化
 */
import vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置中文语言包
import 'dayjs/locale/zh-cn'

// 配置使用相对时间
dayjs.extend(relativeTime)
// 配置中文语言包
dayjs.locale('zh-cn')
// 时间日期格式化
// dayjs.format('YYYY-MM-DD HH:mm:ss')

// dayjs('2008-01-01').from(dayjs())   2008到现在的时间  xx前

// 处理相对时间的代码处理为过滤器 可以在任何地方使用vue
vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
