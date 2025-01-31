import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './styles/globals.css'

// biome-ignore lint/style/noNonNullAssertion: this element exists by default
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
