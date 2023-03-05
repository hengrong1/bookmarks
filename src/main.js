import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'

import './assets/base.css'

const app = createApp(App)

app.use(createPinia().use(piniaPersist))

app.mount('#app')