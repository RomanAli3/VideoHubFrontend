import {BrowserRouter,Routes,Route} from 'react-router-dom'
import OutletPage from './Pages/outletPage'
import HomePage from './Pages/homePage'
import ProfilePage from './Pages/ProfilePage'
function RouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletPage />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterPage