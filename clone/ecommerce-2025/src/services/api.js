/* eslint-disable prettier/prettier */
import axios from 'axios'

// Base URL del backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Debe conicidir con backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // 🔑 esto es lo que activa el envío de cookies
})

// Interceptor de solicitud: agrega el token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Error en solicitud:', error.message)
    return Promise.reject(error)
  }
)

// Interceptor de respuesta: maneja errores comunes
// Función para configurar interceptores
export const setupInterceptors = () => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status
      const message = error.response?.data?.message || error.message

      if (status === 401) {
        console.warn('⚠️ No autorizado. Token inválido o expirado.')

        // Elimina el token
        localStorage.removeItem('token')

        // Guarda un mensaje en localStorage para mostrarlo en login
        localStorage.setItem('sessionExpired', 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.')

        // Redirige al login
        window.location.href = '/#/login'
      } else if (status === 403) {
        console.warn('🚫 Acceso prohibido. Verifica permisos o rol.')
      } else {
        console.error('❌ Error en API:', message)
      }

      return Promise.reject(error)
    }
  )
}

export default api