import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const BAR_ID = import.meta.env.VITE_BAR_ID

export default {
  install(app, options) {
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