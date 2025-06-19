import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import TabNavigation from './components/TabNavigation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TabNavigation />
    </BrowserRouter>
  </StrictMode>,
)
