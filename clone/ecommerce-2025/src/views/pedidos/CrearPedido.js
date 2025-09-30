import React, { useState, useEffect } from 'react'
import { crearPedido } from '../../services/pedidoService'
import { getTodosLosProductos } from '../../services/productoService';
import { CButton, CFormInput, CCard, CCardBody, CCardHeader, CFormSelect } from '@coreui/react'

const CrearPedido = () => {  
  const [items, setItems] = useState([{ productoId: '', cantidad: 1 }])
  const [mensaje, setMensaje] = useState(null)
  const [productos, setProductos] = useState([]);

  // 🔄 Cargar productos al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getTodosLosProductos(); // 👈 función que combina libros, cafés, etc.
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos:', err.message);
      }
    };

    cargarProductos();
  }, []);


  const handleChange = (index, field, value) => {
    const nuevosItems = [...items]
    nuevosItems[index][field] = value
    setItems(nuevosItems)
  }

  const agregarItem = () => {
    setItems([...items, { productoId: '', cantidad: 1 }])
  }

  const handleSubmit = async () => {
     // 🔍 Validación previa
    const pedidoValido = items.every(item =>
      item.productoId && !isNaN(parseInt(item.productoId)) && item.cantidad > 0
    );

    if (!pedidoValido) {
      setMensaje('❌ Debes ingresar un ID de producto válido y una cantidad mayor a cero.');
      return;
    }

    try {
      const pedido = {
        fecha: new Date().toISOString(),
        items: items.map(item => ({
          productoId: Number(item.productoId),
          cantidad: item.cantidad
        }))
      }      
      await crearPedido(pedido)
      setMensaje('✅ Pedido creado correctamente.')
      setItems([{ productoId: '', cantidad: 1 }])
    } catch (err) {
      setMensaje('❌ Error al crear pedido.')
    }
  }

  return (
    <CCard>
      <CCardHeader><strong>🛒 Crear Pedido</strong></CCardHeader>
      <CCardBody>
        {items.map((item, index) => (
          <div key={index} className="mb-3 d-flex gap-2">
            <CFormSelect
              value={item.productoId}
              onChange={(e) => handleChange(index, 'productoId', e.target.value)}
            >
              <option value="">Selecciona un producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} — ${p.precio}
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              type="number"
              placeholder="Cantidad"
              value={item.cantidad}
              onChange={(e) => handleChange(index, 'cantidad', Number(e.target.value))}
            />
          </div>
        ))}
        <CButton color="secondary" onClick={agregarItem}>➕ Agregar producto</CButton>
        <CButton color="primary" className="ms-2" onClick={handleSubmit}>📦 Enviar pedido</CButton>
        {mensaje && <p className="mt-3">{mensaje}</p>}
      </CCardBody>
    </CCard>
  )
}

export default CrearPedido