import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProductsContextProvider } from "./store/ProductsContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>  
  </StrictMode>,
)
