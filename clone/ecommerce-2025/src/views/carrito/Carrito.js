import { useEffect, useState } from 'react'
import { getTodosLosProductos } from '../../services/productoService'
import { agregarAlCarrito, verCarrito, pagarCarrito } from '../../services/carritoService'
import {
  CCard, CCardHeader, CCardBody, CFormSelect, CFormInput,
  CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CSpinner
} from '@coreui/react'

const Carrito = () => {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [nuevoItem, setNuevoItem] = useState({ productoId: '', cantidad: 1 })
  const [mensaje, setMensaje] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const productosData = await getTodosLosProductos()
        const carritoData = await verCarrito()
        setProductos(productosData)
        setCarrito(carritoData)
      } catch (err) {
        console.error('Error al cargar datos:', err.message)
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [])

  const handleAgregar = async () => {
    if (!nuevoItem.productoId || nuevoItem.cantidad <= 0) {
      setMensaje('❌ Selecciona un producto y cantidad válida.')
      return
    }

    try {
      await agregarAlCarrito(nuevoItem)
      const actualizado = await verCarrito()
      setCarrito(actualizado)
      setNuevoItem({ productoId: '', cantidad: 1 })
      setMensaje('✅ Producto agregado al carrito.')
    } catch (err) {
      setMensaje('❌ Error al agregar al carrito.')
    }
  }

  const handlePagar = async () => {
    try {
      const pedido = await pagarCarrito()
      setCarrito([])
      setMensaje(`✅ Pedido creado con ID ${pedido.id}.`)
    } catch (err) {
      setMensaje('❌ Error al procesar el pedido.')
    }
  }

  return (
    <CCard>
      <CCardHeader><strong>🛒 Carrito de Compras</strong></CCardHeader>
      <CCardBody>
        <div className="d-flex gap-2 mb-3">
          <CFormSelect
            value={nuevoItem.productoId}
            onChange={(e) => setNuevoItem({ ...nuevoItem, productoId: e.target.value })}
          >
            <option value="">Selecciona un producto</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} — ${p.precio}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type="number"
            placeholder="Cantidad"
            value={nuevoItem.cantidad}
            onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: Number(e.target.value) })}
          />
          <CButton color="success" onClick={handleAgregar}>➕ Agregar</CButton>
        </div>

        {loading ? (
          <div className="text-center"><CSpinner color="primary" /></div>
        ) : carrito.length === 0 ? (
          <p>🛍️ El carrito está vacío.</p>
        ) : (
          <>
            <CTable striped hover responsive bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>Producto</CTableHeaderCell>
                  <CTableHeaderCell>Cantidad</CTableHeaderCell>
                  <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                  <CTableHeaderCell>Subtotal</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {carrito.map((item, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell>{item.nombre}</CTableDataCell>
                    <CTableDataCell>{item.cantidad}</CTableDataCell>
                    <CTableDataCell>${item.precioUnitario}</CTableDataCell>
                    <CTableDataCell>${(item.precioUnitario * item.cantidad).toFixed(2)}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CButton color="primary" className="mt-3" onClick={handlePagar}>💳 Pagar</CButton>
          </>
        )}
        {mensaje && <p className="mt-3">{mensaje}</p>}
      </CCardBody>
    </CCard>
  )
}

export default Carrito