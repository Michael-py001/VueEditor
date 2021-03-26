import Vue from 'vue'
import App from './App.vue'
// 引入element UI ,css文件需要单独引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局使用
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  // h 是 createElement的简写 用来渲染组件
  render: h => h(App), //将App这个对象转换成虚拟dom，再进行渲染组件
  // 还可以简写成...App，因为App里面也有render函数
  // ...App
}).$mount('#app')
