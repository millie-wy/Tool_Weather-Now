import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useDataStore } from './store/DataStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

export const useStore = useDataStore()
