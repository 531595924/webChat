import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 *  动画滚动到指定位置
 * @param {Document} el 需要滚动的元素class
 * @param {Number} distance 滚动指定高度，默认为0
 * @param {Number} time 滚动动画时间，默认500
 */
Vue.prototype.$scrollTo = function (el, distance = 0, time = 500) {
  let stepNumber = 50;
  let step = (el.scrollTop - distance) / stepNumber;
  let interval = time / stepNumber;
  (function fn() {
    el.scrollTop -= step;
    stepNumber --;
    if(stepNumber > 0) {
      setTimeout(() => {
        fn();
      }, interval);
    }
  })()
}
