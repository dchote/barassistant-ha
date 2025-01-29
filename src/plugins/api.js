import axios from 'axios'

export default {
  install(app, options) {
    var bar_id = new URL(window.location.toString()).searchParams.get('bar_id')
    var collection_id = new URL(window.location.toString()).searchParams.get('collection_id')
    
    const API_URL = import.meta.env.VITE_API_URL
    const API_TOKEN = import.meta.env.VITE_API_TOKEN
    const BAR_ID = bar_id || import.meta.env.VITE_BAR_ID
    const COLLECTION_ID = collection_id || import.meta.env.VITE_COLLECTION_ID
    
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