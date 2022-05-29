import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { createPinia } from 'pinia'
import VueToast from 'vue-toast-notification'

createApp(App).use(router).use(VueToast).use(createPinia()).mount('#app')
