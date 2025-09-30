import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCamera,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilLibraryAdd,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSearch,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [  
  {
    component: CNavTitle,
    name: 'Opciones',
  },
  {
    component: CNavItem,
    name: 'Lista de Productos',
    to: '/productos',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Galería',
    to: '/galeria',
    icon: <CIcon icon={cilCamera} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Carrito',
    to: '/carrito',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Historial de Pedidos',
    to: '/pedidos/historial',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,    
  },
]

export default _nav
