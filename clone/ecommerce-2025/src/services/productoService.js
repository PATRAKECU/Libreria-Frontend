/* eslint-disable prettier/prettier */
import api from './api'

const ENDPOINT = '/products'

export const getProductos = async () => {
  const res = await api.get(ENDPOINT)
  return res.data
}

export const getProductoById = async (id) => {
  const res = await api.get(`${ENDPOINT}/${id}`)
  return res.data
}

export const createProducto = async (producto) => {
  const res = await api.post(ENDPOINT, producto)
  return res.data
}

export const updateProducto = async (id, producto) => {
  const res = await api.put(`${ENDPOINT}/${id}`, producto)
  return res.data
}

export const deleteProducto = async (id) => {
  await api.delete(`${ENDPOINT}/${id}`)
  return true
}