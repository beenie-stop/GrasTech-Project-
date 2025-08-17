import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Web from './mytodo/Web'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  < StrictMode >
    <BrowserRouter>
      <Web />
    </BrowserRouter>
  </StrictMode >,
)
