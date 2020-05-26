import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

// 智慧巡警证书信息
//密码:zhxj123456
//证书名称：zhxjApp