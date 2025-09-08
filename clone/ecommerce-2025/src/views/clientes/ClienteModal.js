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

const ClienteModal = ({ visible, onClose, onSave, form, setForm, editingCliente }) => {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!form.nombre || form.nombre.trim() === '') {
      newErrors.nombre = 'El nombre es obligatorio'
    }

    if (!form.correo || form.correo.trim() === '') {
      newErrors.correo = 'El correo es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      newErrors.correo = 'El formato del correo no es válido'
    }

    if (!form.contraseña || form.contraseña.trim() === '') {
      newErrors.contraseña = 'La contraseña es obligatoria'
    } else if (form.contraseña.length < 6) {
      newErrors.contraseña = 'Debe tener al menos 6 caracteres'
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
        <strong>{editingCliente ? '✏️ Editar Cliente' : '➕ Nuevo Cliente'}</strong>
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
            label="Correo"
            type="email"
            value={form.correo}
            invalid={!!errors.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          {errors.correo && <CFormFeedback invalid>{errors.correo}</CFormFeedback>}

          <CFormInput
            className="mb-2"
            label="Contraseña"
            type="password"
            value={form.contraseña}
            invalid={!!errors.contraseña}
            onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
          />
          {errors.contraseña && <CFormFeedback invalid>{errors.contraseña}</CFormFeedback>}
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

export default ClienteModal