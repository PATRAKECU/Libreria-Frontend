import React from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CButton, CRow, CCol } from '@coreui/react'
import { cilBook, cilCoffee, cilStar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'
import portada from 'src/assets/images/soportes3.jpg'

const Inicio = () => {
  return (
    <CCard className="text-center border-0">      
      <CCardBody>
        <CCardTitle className="fw-bold fs-4 text-primary">Bienvenido a Librería Saint Patrick</CCardTitle>
        <CCardImage orientation="top" src={portada} alt="Librería Saint Patrick" />
        <CCardText className="fs-6">
          Somos una librería virtual dedicada a ofrecer libros, café y productos únicos para lectores apasionados.
          Nuestra misión es conectar conocimiento, cultura y calidez en cada pedido.
        </CCardText>
      </CCardBody>
      <CRow className="mt-4 text-center">
        <CCol>
            <CIcon icon={cilBook} size="xl" className="text-primary mb-2" />
            <p>Libros para todos los gustos</p>
        </CCol>
        <CCol>
            <CIcon icon={cilCoffee} size="xl" className="text-warning mb-2" />
            <p>Café para acompañar la lectura</p>
        </CCol>
        <CCol>
            <CIcon icon={cilStar} size="xl" className="text-success mb-2" />
            <p>Productos únicos y memorables</p>
        </CCol>
        </CRow>

        <div className="mt-4">
        <blockquote className="blockquote text-center text-secondary">
            <p>“Una librería no vende libros, vende mundos.”</p>
        </blockquote>
        <div className="text-center mt-3">
          <NavLink to="/productos">
            <CButton color="primary">
              Explorar catálogo
            </CButton>
          </NavLink>
        </div>
        </div>

    </CCard>
  )
}

export default Inicio