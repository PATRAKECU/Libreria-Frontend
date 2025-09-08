import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
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
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Lista de Clientes',
    to: '/clientes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Registro de Usuario',
    to: '/registro',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,    
  }, 
]

export default _nav
