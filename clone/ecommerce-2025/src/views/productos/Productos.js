/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CFormInput,
} from '@coreui/react'
import ProductoModal from './ProductoModal'

// Importamos el servicio
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../../services/productoService'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal
  const [visible, setVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Formulario
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '', descripcion: '', stock: '' })

  // Búsqueda y orden
  const [search, setSearch] = useState('')
  const [sortColumn, setSortColumn] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      setLoading(true)
      const data = await getProductos()
      setProductos(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleNuevo = () => {
    setEditingProduct(null)
    setForm({ nombre: '', categoria: '', precio: '', descripcion: '', stock: '' })
    setVisible(true)
  }

  const handleEditar = (producto) => {
    setEditingProduct(producto)
    setForm({
      nombre: producto.nombre,
      categoria: producto.categoria || '',
      precio: producto.precio,
      descripcion: producto.descripcion || '',
      stock: producto.stock || '',
    })
    setVisible(true)
  }

  const handleGuardar = async () => {
    try {
      if (editingProduct) {
        await updateProducto(editingProduct.id, {
          ...editingProduct,
          ...form,
          precio: Number(form.precio),
          stock: Number(form.stock),
        })
      } else {
        await createProducto({ ...form, precio: Number(form.precio) })
      }
      await cargarProductos()
      setVisible(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        await deleteProducto(id)
        await cargarProductos()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  // Ordenar
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  // Filtrar + ordenar
  const filtered = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.categoria.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>📦 CRUD de Productos</strong>
            <CButton color="primary" onClick={handleNuevo}>
              ➕ Nuevo Producto
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Buscador */}
            <CFormInput
              type="text"
              placeholder="🔎 Buscar por nombre o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3"
            />

            {loading && (
              <div className="text-center">
                <CSpinner color="primary" />
              </div>
            )}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
              <CTable striped hover responsive bordered>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSort('id')}
                    >
                      ID {sortColumn === 'id' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSort('nombre')}
                    >
                      Nombre {sortColumn === 'nombre' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSort('categoria')}
                    >
                      Categoría {sortColumn === 'categoria' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSort('precio')}
                    >
                      Precio ($) {sortColumn === 'precio' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSort('descripcion')}
                    >
                      Descripción {sortColumn === 'descripcion' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSort('stock')}
                    >
                      Stock {sortColumn === 'stock' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ width: '120px', textAlign: 'center' }}>
                      Acciones
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sorted.map((p) => (
                    <CTableRow key={p.id}>
                      <CTableDataCell>{p.id}</CTableDataCell>
                      <CTableDataCell>{p.nombre}</CTableDataCell>
                      <CTableDataCell>{p.categoria || '—'}</CTableDataCell>
                      <CTableDataCell>${p.precio}</CTableDataCell>
                      <CTableDataCell>{p.descripcion}</CTableDataCell>
                      <CTableDataCell>{p.stock}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          size="sm"
                          color="info"
                          className="me-1"
                          onClick={() => handleEditar(p)}
                        >
                          ✏️
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          onClick={() => handleEliminar(p.id)}
                        >
                          🗑
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal externo */}
      <ProductoModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleGuardar}
        form={form}
        setForm={setForm}
        editingProduct={editingProduct}
      />
    </CRow>
  )
}

export default Productos