import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CFormSelect,
} from '@coreui/react'

import api from '../../../services/api' // cliente axios


const RegistroUsuario = () => {
  const [usuario, setUsuario] = useState({
  correo: '',
  contraseña: '',
  confirmarContraseña: '',
  rol: 'USER', // valor por defecto
  })

  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario({ ...usuario, [name]: value })
    validarCampo(name, value)
  }

  const validarCampo = (name, value) => {
    let mensaje = ''

    if (name === 'correo' && !value.includes('@')) mensaje = 'Correo inválido.'
    if (name === 'contraseña' && value.length < 6) mensaje = 'Debe tener al menos 6 caracteres.'
    if (name === 'confirmarContraseña' && value !== usuario.contraseña) mensaje = 'Las contraseñas no coinciden.'

    setErrores((prev) => ({ ...prev, [name]: mensaje }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nuevosErrores = {}

    Object.entries(usuario).forEach(([campo, valor]) => {
      validarCampo(campo, valor)
      if (errores[campo]) nuevosErrores[campo] = errores[campo]
    })

    if (Object.keys(nuevosErrores).length === 0) {
      try {
        const payload = {
          email: usuario.correo,
          password: usuario.contraseña,
          rol: usuario.rol,
        }
        const res = await api.post('/auth/register', payload)
        if (res.status === 200 || res.status === 201) {
          setExito('Registro exitoso. Redirigiendo al login...')
          setUsuario({ correo: '', contraseña: '', confirmarContraseña: '', rol: 'USER' })

          setTimeout(() => {
            navigate('/login')
          }, 3000) // espera 3 segundos antes de redirigir
        }
      } catch (err) {
        setErrores({ correo: 'El correo ya está registrado.' })
        setExito(null)
      }
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
            {exito && <div className="alert alert-success">
              {exito}              
              </div>}
            <CForm onSubmit={handleSubmit}>
              {[                
                { label: 'Correo electrónico', name: 'correo', type: 'email' },
                { label: 'Contraseña', name: 'contraseña', type: 'password' },
                { label: 'Confirmar contraseña', name: 'confirmarContraseña', type: 'password' },                
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
              {/* Campo único para el rol */}
              <div className="mb-3">
                <CFormLabel htmlFor="rol">Rol</CFormLabel>
                <CFormSelect
                  id="rol"
                  name="rol"
                  value={usuario.rol}
                  onChange={handleChange}
                >
                  <option value="USER">Usuario</option>
                  <option value="ADMIN">Administrador</option>
                </CFormSelect>
              </div>
              <CButton type="submit" color="primary" className="mt-3">Registrar</CButton>
            </CForm>
            <div className="d-flex justify-content-end mt-4">
              <CButton color="secondary" onClick={() => navigate('/login')}>
                Ya tengo cuenta
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegistroUsuario