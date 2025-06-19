import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Home from './components/Home.tsx'
import HelloHuman from './components/HelloHuman.tsx'
import TabNavigation from './components/TabNavigation.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TabNavigation>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hello-human" element={<HelloHuman />} />
        </Routes>
      </TabNavigation>
    </BrowserRouter>
  </StrictMode>,
)
