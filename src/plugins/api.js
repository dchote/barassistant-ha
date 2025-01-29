import axios from 'axios'

export default {
  install(app, options) {
    var route = app.config.globalProperties.$route
    
    const API_URL = import.meta.env.VITE_API_URL
    const API_TOKEN = import.meta.env.VITE_API_TOKEN
    const BAR_ID = route.query.bar_id || import.meta.env.VITE_BAR_ID
    const COLLECTION_ID = route.query.collection_id || import.meta.env.VITE_COLLECTION_ID
    
    app.config.globalProperties.$config = { bar_id: BAR_ID, collection_id: COLLECTION_ID }
    
    console.log('api config', app.config.globalProperties.$config)
    
    app.config.globalProperties.$api = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : '',
        Accept: 'application/json',
        'Bar-Assistant-Bar-Id': BAR_ID
      }
    }) 
  }
}