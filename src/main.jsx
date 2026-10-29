import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Contexts/themeContext.jsx'
import { VideoContextProvider } from './Contexts/videoContext.jsx'
import { UserContextProvider } from './Contexts/userContext.jsx'
import { SearchQueryProvider } from './Contexts/searchQueryContext.jsx'
createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <UserContextProvider>
    <SearchQueryProvider>
  <VideoContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </VideoContextProvider>
  </SearchQueryProvider>
  </UserContextProvider>
  </ThemeProvider>
)
