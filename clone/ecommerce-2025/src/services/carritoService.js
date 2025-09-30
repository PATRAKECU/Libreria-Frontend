import api from './api'

export const agregarAlCarrito = async (item) => {
  await api.post('/pedidos/carrito/agregar', item)
}

export const verCarrito = async () => {
  const res = await api.get('/pedidos/carrito')
  return res.data
}

export const pagarCarrito = async () => {
  const res = await api.post('/pedidos/carrito/pagar')
  return res.data
}