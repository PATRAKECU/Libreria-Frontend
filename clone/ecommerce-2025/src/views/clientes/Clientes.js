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

// Importamos el servicio de clientes
import {
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../../services/clienteService'

import ClienteModal from './ClienteModal'

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal
  const [visible, setVisible] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)

  // Formulario
  const [form, setForm] = useState({ nombre: '', correo: '', contraseña: '' })

  // Búsqueda y orden
  const [search, setSearch] = useState('')
  const [sortColumn, setSortColumn] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    cargarClientes()
  }, [])

  const cargarClientes = async () => {
    try {
      setLoading(true)
      const data = await getCliente()
      setClientes(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleNuevo = () => {
    setEditingCliente(null)
    setForm({ nombre: '', correo: '', contraseña: '' })
    setVisible(true)
  }

  const handleEditar = (cliente) => {
    setEditingCliente(cliente)
    setForm({
      nombre: cliente.nombre,
      correo: cliente.correo,
      contraseña: cliente.contraseña,
    })
    setVisible(true)
  }

  const handleGuardar = async () => {
    try {
      if (editingCliente) {
        await updateCliente(editingCliente.id, {
          ...editingCliente,
          ...form,
        })
      } else {
        await createCliente(form)
      }
      await cargarClientes()
      setVisible(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      try {
        await deleteCliente(id)
        await cargarClientes()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  const filtered = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.correo.toLowerCase().includes(search.toLowerCase())
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
            <strong>👤 CRUD de Clientes</strong>
            <CButton color="primary" onClick={handleNuevo}>
              ➕ Nuevo Cliente
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="🔎 Buscar por nombre o correo..."
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
                    <CTableHeaderCell onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                      ID {sortColumn === 'id' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell onClick={() => handleSort('nombre')} style={{ cursor: 'pointer' }}>
                      Nombre {sortColumn === 'nombre' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell onClick={() => handleSort('correo')} style={{ cursor: 'pointer' }}>
                      Correo {sortColumn === 'correo' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : ''}
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sorted.map((c) => (
                    <CTableRow key={c.id}>
                      <CTableDataCell>{c.id}</CTableDataCell>
                      <CTableDataCell>{c.nombre}</CTableDataCell>
                      <CTableDataCell>{c.correo}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton size="sm" color="info" className="me-1" onClick={() => handleEditar(c)}>
                          ✏️
                        </CButton>
                        <CButton size="sm" color="danger" onClick={() => handleEliminar(c.id)}>
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
      
      {<ClienteModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleGuardar}
        form={form}
        setForm={setForm}
        editingCliente={editingCliente}
      />}
    </CRow>
  )
}

export default Clientes