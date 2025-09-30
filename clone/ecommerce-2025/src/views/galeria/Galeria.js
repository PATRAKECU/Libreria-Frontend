import React from 'react'
import { CRow, CCol, CCard, CCardImage, CCardBody, CCardText, CContainer } from '@coreui/react'
import cafe from 'src/assets/images/cafe.jpg'
import librero1 from 'src/assets/images/librero1.jpg'
import librero2 from 'src/assets/images/librero2.jpg'
import libro1 from 'src/assets/images/libro1.jpg'
import libro2 from 'src/assets/images/libro2.jpg'
import libro3 from 'src/assets/images/libro3.jpg'
import libro5 from 'src/assets/images/libro5.jpg'
import libro6 from 'src/assets/images/libro6.jpg'
import libro7 from 'src/assets/images/libro7.jpg'
import libro8 from 'src/assets/images/libro8.jpg'
import libro9 from 'src/assets/images/libro9.jpg'
import libro10 from 'src/assets/images/libro10.jpg'
import separadores1 from 'src/assets/images/separadores1.jpg'
import separadores5 from 'src/assets/images/separadores5.jpg'
import separadores6 from 'src/assets/images/separadores6.jpg'
import soportes1 from 'src/assets/images/soportes1.jpg'
import soportes2 from 'src/assets/images/soportes2.jpg'

// Secciones organizadas
const secciones = {
  'Libros': [
    { src: libro1, texto: 'Cien Años de Soledad' },
    { src: libro2, texto: 'Antología de la Literatura Fantástica' },
    { src: libro3, texto: 'Cuentos Completos' },
    { src: libro5, texto: 'Inferno' },
    { src: libro6, texto: 'El Aleph' },
    { src: libro7, texto: 'El Perfume' },
    { src: libro8, texto: 'Ficciones' },
    { src: libro9, texto: 'Guerra y Paz' },
    { src: libro10, texto: 'La Sombra del Viento' },
  ],
  'Libreros': [
    { src: librero1, texto: 'Estantes llenos de historias por descubrir' },
    { src: librero2, texto: 'Estantes llenos de magia' },
  ],
  'Separadores': [
    { src: separadores1, texto: 'Separadores animales' },
    { src: separadores5, texto: 'Diseños excéntricos' },
    { src: separadores6, texto: 'Separadores de tela' },
  ],
  'Soportes': [
    { src: soportes1, texto: 'Soportes robustos para libros pesados' },
    { src: soportes2, texto: 'Diseño religioso' },
  ],
  'Cafés': [
    { src: cafe, texto: 'Café soluble Juan Valdéz' },    
  ],
}

const Galeria = () => {
  return (
    <CContainer className="py-4">
      {Object.entries(secciones).map(([titulo, imagenes], index) => (
        <div key={index} className="mb-5">
          <h4 className="text-primary fw-bold mb-3">{titulo}</h4>
          <CRow className="g-4">
            {imagenes.map((img, i) => (
              <CCol xs={12} md={6} lg={3} key={i}>
                <CCard>
                  <CCardImage orientation="top" src={img.src} alt={`Foto ${i + 1}`} />
                  <CCardBody>
                    <CCardText className="text-center text-muted">{img.texto}</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </div>
      ))}
    </CContainer>
  )
}

export default Galeria