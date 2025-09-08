/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormFeedback,
} from '@coreui/react'

const ProductoModal = ({ visible, onClose, onSave, form, setForm, editingProduct }) => {
  const [errors, setErrors] = useState({})

  const validate = () => {
    let newErrors = {}

    if (!form.nombre || form.nombre.trim() === '') {
      newErrors.nombre = 'El nombre es obligatorio'
    }
    if (!form.descripcion || form.descripcion.trim() === '') {
      newErrors.descripcion = 'La descripción es obligatoria'
    }
    if (!form.categoria || form.categoria.trim() === '') {
      newErrors.categoria = 'La categoría es obligatoria'
    }
    if (form.precio === '' || isNaN(form.precio)) {
      newErrors.precio = 'El precio debe ser un número'
    } else if (form.precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor que 0'
    }
    if (form.stock === '' || isNaN(form.stock)) {
      newErrors.stock = 'El stock debe ser un número'
    } else if (form.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      onSave()
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader closeButton>
        <strong>{editingProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</strong>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            className="mb-2"
            label="Nombre"
            value={form.nombre}
            invalid={!!errors.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          {errors.nombre && <CFormFeedback invalid>{errors.nombre}</CFormFeedback>}

          <CFormInput
            className="mb-2"
            label="Descripción"
            value={form.descripcion}
            invalid={!!errors.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          {errors.descripcion && <CFormFeedback invalid>{errors.descripcion}</CFormFeedback>}

          <CFormInput
            className="mb-2"
            label="Categoría"
            value={form.categoria}
            invalid={!!errors.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          />
          {errors.categoria && <CFormFeedback invalid>{errors.categoria}</CFormFeedback>}

          <CFormInput
            className="mb-2"
            type="number"
            label="Precio"
            value={form.precio}
            invalid={!!errors.precio}
            onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
          />
          {errors.precio && <CFormFeedback invalid>{errors.precio}</CFormFeedback>}

          <CFormInput
            className="mb-2"
            type="number"
            label="Stock"
            value={form.stock}
            invalid={!!errors.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          />
          {errors.stock && <CFormFeedback invalid>{errors.stock}</CFormFeedback>}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ProductoModal