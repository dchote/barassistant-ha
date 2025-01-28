/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import api from './api'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(api)
}
