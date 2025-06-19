import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Home from './components/Home.tsx'
import HelloHuman from './components/HelloHuman.tsx'
import Demo from './components/Demo.tsx'
import BottomNavigation from './components/BottomNavigation.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BottomNavigation>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hello-human" element={<HelloHuman />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BottomNavigation>
    </BrowserRouter>
  </StrictMode>,
)
