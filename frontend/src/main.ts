import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'

import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import client from './lib/apollo'

const app = createApp({
  setup: () => {
    provide(DefaultApolloClient, client)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
