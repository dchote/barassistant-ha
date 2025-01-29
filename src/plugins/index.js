/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import api from './api'

export async function registerPlugins (app) {
  app.use(vuetify).use(router)
  
  // chonky way to ensure we can use route query parameters when setting up the API vars
  await router.isReady()
  
  app.use(api)
}
