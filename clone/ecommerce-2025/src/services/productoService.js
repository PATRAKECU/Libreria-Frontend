import api from './api'

// Libros
export const getLibros = () => api.get('/libros').then(res => res.data)
export const createLibro = (data) => api.post('/libros', data).then(res => res.data)
export const updateLibro = (id, data) => api.put(`/libros/${id}`, data).then(res => res.data)
export const deleteLibro = (id) => api.delete(`/libros/${id}`).then(() => true)

// Cafés
export const getCafes = () => api.get('/cafes').then(res => res.data)
export const createCafe = (data) => api.post('/cafes', data).then(res => res.data)
export const updateCafe = (id, data) => api.put(`/cafes/${id}`, data).then(res => res.data)
export const deleteCafe = (id) => api.delete(`/cafes/${id}`).then(() => true)

// Separadores
export const getSeparadores = () => api.get('/separadores').then(res => res.data)
export const createSeparador = (data) => api.post('/separadores', data).then(res => res.data)
export const updateSeparador = (id, data) => api.put(`/separadores/${id}`, data).then(res => res.data)
export const deleteSeparador = (id) => api.delete(`/separadores/${id}`).then(() => true)

// Soportes
export const getSoportes = () => api.get('/soportes').then(res => res.data)
export const createSoporte = (data) => api.post('/soportes', data).then(res => res.data)
export const updateSoporte = (id, data) => api.put(`/soportes/${id}`, data).then(res => res.data)
export const deleteSoporte = (id) => api.delete(`/soportes/${id}`).then(() => true)

// Funciones get unificadas
export const getTodosLosProductos = async () => {
  const [libros, cafes, separadores, soportes] = await Promise.all([
    getLibros(),
    getCafes(),
    getSeparadores(),
    getSoportes()
  ]);

  // Agrega un campo "tipo" para distinguirlos
  const conTipo = [
    ...libros.map(p => ({ ...p, tipo: 'LIBRO' })),
    ...cafes.map(p => ({ ...p, tipo: 'CAFE' })),
    ...separadores.map(p => ({ ...p, tipo: 'SEPARADOR' })),
    ...soportes.map(p => ({ ...p, tipo: 'SOPORTE' }))
  ];

  return conTipo;
};