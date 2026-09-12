import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Contexts/themeContext.jsx'
import { VideoContextProvider } from './Contexts/videoContext.jsx'
import { UserContextProvider } from './Contexts/userContext.jsx'
createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <UserContextProvider>
  <VideoContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </VideoContextProvider>
  </UserContextProvider>
  </ThemeProvider>
)
