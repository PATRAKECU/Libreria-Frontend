import React, { useEffect, useState } from 'react'
import { listarPedidos } from '../../services/pedidoService'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await listarPedidos()
        setPedidos(data)
      } catch (err) {
        console.error('Error al cargar pedidos:', err.message)
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  const calcularTotal = (items) => {
    return items.reduce((acc, item) => {
        const precio = parseFloat(item.precioUnitario || 0)
        const cantidad = parseInt(item.cantidad || 0)
        return acc + precio * cantidad
    }, 0).toFixed(2)
    }

  return (
    <CCard>
      <CCardHeader><strong>📜 Historial de Pedidos</strong></CCardHeader>
      <CCardBody>
        {loading ? (
          <div className="text-center"><CSpinner color="primary" /></div>
        ) : (
          <CTable striped hover responsive bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Productos</CTableHeaderCell>
                <CTableHeaderCell>Total ($)</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pedidos.map((pedido) => (
                <CTableRow key={pedido.id}>
                  <CTableDataCell>{pedido.id}</CTableDataCell>
                  <CTableDataCell>{new Date(pedido.fecha).toLocaleString()}</CTableDataCell>
                  <CTableDataCell>
                    {pedido.items?.map((item, i) => (
                      <div key={i}>
                        🛒 <strong>{item.producto?.nombre || 'Producto desconocido'}</strong> × {item.cantidad} — ${item.precioUnitario}
                      </div>
                    ))}
                  </CTableDataCell>
                  <CTableDataCell>${calcularTotal(pedido.items)}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}

export default HistorialPedidos