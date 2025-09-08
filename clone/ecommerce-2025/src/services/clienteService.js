/* eslint-disable prettier/prettier */
import api from './api'

const ENDPOINT = '/clientes'

export const getCliente = async () => {
  const res = await api.get(ENDPOINT)
  return res.data
}

export const getClienteById = async (id) => {
  const res = await api.get(`${ENDPOINT}/${id}`)
  return res.data
}

export const createCliente = async (cliente) => {
  const res = await api.post(ENDPOINT, cliente)
  return res.data
}

export const updateCliente = async (id, cliente) => {
  const res = await api.put(`${ENDPOINT}/${id}`, cliente)
  return res.data
}

export const deleteCliente = async (id) => {
  await api.delete(`${ENDPOINT}/${id}`)
  return true
}