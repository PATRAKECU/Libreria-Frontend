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
  CFormSelect,
} from '@coreui/react'
import ProductoModal from './ProductoModal'

// Importamos el servicio
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  getSeparadores,
  createSeparador,
  updateSeparador,
  deleteSeparador,
  getSoportes,
  createSoporte,
  updateSoporte,
  deleteSoporte,
} from '../../services/productoService'

const Productos = () => {
  const [tipo, setTipo] = useState('LIBRO') // Tipo actual
  const [productos, setProductos] = useState([])  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal
  const [visible, setVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Formulario
  const getFormularioInicial = (tipo) => {
    switch (tipo) {
      case 'LIBRO':
        return { nombre: '', descripcion: '', precio: '', stock: '', tipo, autor: '', editorial: '', estado: '' }
      case 'CAFE':
        return { nombre: '', descripcion: '', precio: '', stock: '', tipo, origen: '', presentacion: '', pesoGramos: '' }
      case 'SEPARADOR':
        return { nombre: '', descripcion: '', precio: '', stock: '', tipo, material: '', dimensionesCm: '' }
      case 'SOPORTE':
        return { nombre: '', descripcion: '', precio: '', stock: '', tipo, material: '', peso: '' }
      default:
        return { nombre: '', descripcion: '', precio: '', stock: '', tipo }
    }
  }

  const [form, setForm] = useState(getFormularioInicial(tipo))

  // Búsqueda y orden
  const [search, setSearch] = useState('')
  const [sortColumn, setSortColumn] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')

  const servicioPorTipo = {
    LIBRO: {
      get: getLibros,
      create: createLibro,
      update: updateLibro,
      delete: deleteLibro,
    },
    CAFE: {
      get: getCafes,
      create: createCafe,
      update: updateCafe,
      delete: deleteCafe,
    },
    SEPARADOR: {
      get: getSeparadores,
      create: createSeparador,
      update: updateSeparador,
      delete: deleteSeparador,
    },
    SOPORTE: {
      get: getSoportes,
      create: createSoporte,
      update: updateSoporte,
      delete: deleteSoporte,
    },
  }
  
  useEffect(() => {
    cargarProductos()
  }, [tipo])

  useEffect(() => {
    setForm(getFormularioInicial(tipo))
  }, [tipo])

  const cargarProductos = async () => {
    setLoading(true)
    try {
      const servicio = servicioPorTipo[tipo]
      if (!servicio || !servicio.get) {
        throw new Error(`No se encontró servicio para tipo: ${tipo}`)
      }
      const data = await servicio.get()
      setProductos(data)
    } catch (err) {
      setError(err.message || 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  const handleNuevo = () => {
    setEditingProduct(null)
    setForm({ nombre: '', precio: '', descripcion: '', stock: '', tipo })
    setVisible(true)
  }  

  const handleEditar = (producto) => {
  setEditingProduct(producto)

  const baseForm = {
    nombre: producto.nombre,
    precio: producto.precio,
    descripcion: producto.descripcion || '',
    stock: producto.stock ?? '',
    tipo: producto.tipo,
  }

  let tipoForm = {}

  switch (producto.tipo) {
    case 'LIBRO':
      tipoForm = {
        autor: producto.autor || '',
        editorial: producto.editorial || '',
        estado: producto.estado || '',
      }
      break
    case 'CAFE':
      tipoForm = {
        origen: producto.origen || '',
        presentacion: producto.presentacion || '',
        pesoGramos: producto.pesoGramos ?? '',
      }
      break
    case 'SEPARADOR':
      tipoForm = {
        material: producto.material || '',
        dimensionesCm: producto.dimensionesCm ?? '',
      }
      break
    case 'SOPORTE':
      tipoForm = {
        material: producto.material || '',
        peso: producto.peso ?? '',
      }
      break
    default:
      tipoForm = {}
  }

  setForm({ ...baseForm, ...tipoForm })
  setVisible(true)
}

  const handleGuardar = async () => {
  const payload = { ...form }
  try {
    const servicio = servicioPorTipo[form.tipo] // ← usa el tipo real del producto y no el seleccionado en el menú desplegable
    if (editingProduct) {
      await servicio.update(editingProduct.id, payload)
    } else {
      await servicio.create(payload)
    }
    await cargarProductos()
    setVisible(false)
  } catch (err) {
    setError(err.message)
  }
}


  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      try {
        await servicioPorTipo[tipo].delete(id)
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
  const filtered = productos
  .filter(p => !p.demo)
  .filter(p => {
    const term = search.toLowerCase()
    return (
      p.nombre.toLowerCase().includes(term) ||
      (p.tipo && p.tipo.toLowerCase().includes(term))
    )
  })

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
              placeholder="🔎 Buscar por nombre o tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3"
            />
            <CFormSelect
              label="Tipo de producto"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="LIBRO">Libro</option>
              <option value="CAFE">Café</option>
              <option value="SEPARADOR">Separador</option>
              <option value="SOPORTE">Soporte</option>
            </CFormSelect>            

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
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>                    
                    <CTableHeaderCell>Precio ($)</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Stock</CTableHeaderCell>

                    {/* Atributos de LIBRO */}
                    <CTableHeaderCell>Autor</CTableHeaderCell>
                    <CTableHeaderCell>Editorial</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>

                    {/* Atributos de CAFE */}
                    <CTableHeaderCell>Origen</CTableHeaderCell>
                    <CTableHeaderCell>Presentación</CTableHeaderCell>
                    <CTableHeaderCell>Peso (g)</CTableHeaderCell>

                    {/* Atributos de SEPARADOR */}
                    <CTableHeaderCell>Material (Separador)</CTableHeaderCell>
                    <CTableHeaderCell>Dimensiones (cm)</CTableHeaderCell>

                    {/* Atributos de SOPORTE */}
                    <CTableHeaderCell>Material (Soporte)</CTableHeaderCell>
                    <CTableHeaderCell>Peso (lbs)</CTableHeaderCell>

                    <CTableHeaderCell style={{ width: '120px', textAlign: 'center' }}>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sorted.map((p) => (
                    <CTableRow key={p.id}>
                      <CTableDataCell>{p.id}</CTableDataCell>
                      <CTableDataCell>{p.nombre}</CTableDataCell>                      
                      <CTableDataCell>${p.precio}</CTableDataCell>
                      <CTableDataCell>{p.descripcion || '—'}</CTableDataCell>
                      <CTableDataCell>{p.stock ?? '—'}</CTableDataCell>

                      {/* LIBRO */}
                      <CTableDataCell>{p.autor || '—'}</CTableDataCell>
                      <CTableDataCell>{p.editorial || '—'}</CTableDataCell>
                      <CTableDataCell>{p.estado || '—'}</CTableDataCell>

                      {/* CAFE */}
                      <CTableDataCell>{p.origen || '—'}</CTableDataCell>
                      <CTableDataCell>{p.presentacion || '—'}</CTableDataCell>
                      <CTableDataCell>{p.pesoGramos ?? '—'}</CTableDataCell>

                      {/* SEPARADOR */}
                      <CTableDataCell>{p.material && tipo === 'SEPARADOR' ? p.material : '—'}</CTableDataCell>
                      <CTableDataCell>{p.dimensionesCm ?? '—'}</CTableDataCell>

                      {/* SOPORTE */}
                      <CTableDataCell>{p.material && tipo === 'SOPORTE' ? p.material : '—'}</CTableDataCell>
                      <CTableDataCell>{p.peso ?? '—'}</CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CButton size="sm" color="info" className="me-1" onClick={() => handleEditar(p)}>✏️</CButton>
                        <CButton size="sm" color="danger" onClick={() => handleEliminar(p.id)}>🗑</CButton>
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