import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import "normalize.css"
import "./assets/css/index.css"
import useDirectives from './directives'


const app = createApp(App)
useDirectives(app)

app.use(router).use(pinia).mount('#app')
