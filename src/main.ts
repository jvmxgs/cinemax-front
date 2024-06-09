import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-orange/theme.css'
import './assets/main.css'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import Lara from '@/presets/lara'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
