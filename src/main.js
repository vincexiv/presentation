import Vue from 'vue'
import App from './App.vue'
import ribbonMixin from './ribbonMixin'

Vue.config.productionTip = false
Vue.mixin(ribbonMixin);

new Vue({
  render: h => h(App),
}).$mount('#app')
