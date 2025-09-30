import api from './api'

const ENDPOINT = '/pedidos'

export const crearPedido = async (pedido) => {
  const res = await api.post(ENDPOINT, pedido)
  return res.data
}

export const listarPedidos = async () => {
  const res = await api.get(ENDPOINT)
  return res.data
}

export const eliminarPedido = async (id) => {
  await api.delete(`${ENDPOINT}/${id}`)
  return true
}