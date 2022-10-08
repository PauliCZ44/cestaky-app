import ReactDOM from 'react-dom/client'
import App from './Components/root/App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
