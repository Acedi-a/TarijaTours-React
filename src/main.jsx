import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Rutas from '../Routes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Rutas/>
    </div>
  </StrictMode>,
)
