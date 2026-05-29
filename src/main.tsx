import React from 'react'
import ReactDOM from 'react-dom/client'
import { TaskProvider } from './context/TaskContext'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
   
  </React.StrictMode>,
)
