import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import compiled Tailwind CSS styles from lit-components
import '@lzt/lit-components/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
