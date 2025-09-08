import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
} from '@coreui/react'

const RegistroUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    fechaNacimiento: '',
    cantidad: '',
  })

  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario({ ...usuario, [name]: value })
    validarCampo(name, value)
  }

  const validarCampo = (name, value) => {
    let mensaje = ''

    if (name === 'nombre' && !value.trim()) mensaje = 'El nombre es obligatorio.'
    if (name === 'correo' && !value.includes('@')) mensaje = 'Correo inválido.'
    if (name === 'contraseña' && value.length < 6) mensaje = 'Debe tener al menos 6 caracteres.'
    if (name === 'confirmarContraseña' && value !== usuario.contraseña) mensaje = 'Las contraseñas no coinciden.'
    if (name === 'fechaNacimiento' && !value) mensaje = 'La fecha es obligatoria.'
    if (name === 'cantidad' && (isNaN(value) || Number(value) <= 0)) mensaje = 'Debe ser un número mayor a cero.'

    setErrores((prev) => ({ ...prev, [name]: mensaje }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = {}

    Object.entries(usuario).forEach(([campo, valor]) => {
      validarCampo(campo, valor)
      if (errores[campo]) nuevosErrores[campo] = errores[campo]
    })

    if (Object.keys(nuevosErrores).length === 0) {
      setExito('Registro exitoso.')
      setErrores({})
      // Aquí podrías enviar los datos al backend
    } else {
      setExito(null)
      setErrores(nuevosErrores)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader><strong>Registro de Usuario</strong></CCardHeader>
          <CCardBody>
            {exito && <div className="alert alert-success">{exito}</div>}
            <CForm onSubmit={handleSubmit}>
              {[
                { label: 'Nombre', name: 'nombre', type: 'text' },
                { label: 'Correo electrónico', name: 'correo', type: 'email' },
                { label: 'Contraseña', name: 'contraseña', type: 'password' },
                { label: 'Confirmar contraseña', name: 'confirmarContraseña', type: 'password' },
                { label: 'Fecha de nacimiento', name: 'fechaNacimiento', type: 'date' },
                { label: 'Cantidad', name: 'cantidad', type: 'number' },
              ].map(({ label, name, type }) => (
                <div key={name} className="mb-3">
                  <CFormLabel htmlFor={name}>{label}</CFormLabel>
                  <CFormInput
                    type={type}
                    id={name}
                    name={name}
                    value={usuario[name]}
                    onChange={handleChange}
                    invalid={!!errores[name]}
                  />
                  <CFormFeedback invalid>{errores[name]}</CFormFeedback>
                </div>
              ))}
              <CButton type="submit" color="primary" className="mt-3">Registrar</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegistroUsuario