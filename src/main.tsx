import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'

const baseUrl = process.env.NODE_ENV === 'development' ? '' : 'personal-finance';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseUrl}>
     <App />
    </BrowserRouter>
  </React.StrictMode>,
)
