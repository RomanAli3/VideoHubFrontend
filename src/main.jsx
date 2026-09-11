import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Contexts/themeContext.jsx'
import { VideoContextProvider } from './Contexts/videoContext.jsx'
createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <VideoContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </VideoContextProvider>
  </ThemeProvider>
)
