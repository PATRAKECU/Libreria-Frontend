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
  CFormSelect,
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
    if (!form.tipo || form.tipo.trim() === '') {
      newErrors.tipo = 'El tipo de producto es obligatorio'
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
        <CFormSelect
          className="mb-2"
          label="Tipo de producto"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="">Seleccione tipo</option>
          <option value="LIBRO">Libro</option>
          <option value="CAFE">Café</option>
          <option value="SEPARADOR">Separador</option>
          <option value="SOPORTE">Soporte</option>
        </CFormSelect>
        {errors.tipo && <CFormFeedback invalid>{errors.tipo}</CFormFeedback>}
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
          {form.tipo === 'LIBRO' && (
            <>
              <CFormInput
                className="mb-2"
                label="Autor"
                value={form.autor || ''}
                onChange={(e) => setForm({ ...form, autor: e.target.value })}
              />
              <CFormInput
                className="mb-2"
                label="Editorial"
                value={form.editorial || ''}
                onChange={(e) => setForm({ ...form, editorial: e.target.value })}
              />
              <CFormInput
                className="mb-2"
                label="Estado"
                value={form.estado || ''}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
              />
            </>
          )}

          {form.tipo === 'CAFE' && (
            <>
              <CFormInput
                className="mb-2"
                label="Origen"
                value={form.origen || ''}
                onChange={(e) => setForm({ ...form, origen: e.target.value })}
              />
              <CFormInput
                className="mb-2"
                label="Presentación"
                value={form.presentacion || ''}
                onChange={(e) => setForm({ ...form, presentacion: e.target.value })}
              />
              <CFormInput
                className="mb-2"
                type="number"
                label="Peso (g)"
                value={form.pesoGramos || ''}
                onChange={(e) => setForm({ ...form, pesoGramos: Number(e.target.value) })}
              />
            </>
          )}

          {form.tipo === 'SEPARADOR' && (
            <>
              <CFormInput
                className="mb-2"
                label="Material"
                value={form.material || ''}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
              />
              <CFormInput
                className="mb-2"
                type="number"
                label="Dimensiones (cm)"
                value={form.dimensionesCm || ''}
                onChange={(e) => setForm({ ...form, dimensionesCm: Number(e.target.value) })}
              />
            </>
          )}

          {form.tipo === 'SOPORTE' && (
            <>
              <CFormInput
                className="mb-2"
                label="Material"
                value={form.material || ''}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
              />
              <CFormInput
                className="mb-2"
                type="number"
                label="Peso (lbs)"
                value={form.peso || ''}
                onChange={(e) => setForm({ ...form, peso: Number(e.target.value) })}
              />
            </>
          )}
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