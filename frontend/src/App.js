
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from './pages/Home'
import SiteLaylout from './pages/Layout'
import Article from './pages/Article'
import Publish from './pages/Publish'
import { AuthRoute } from '@/components/AuthRoute'
import './App.css'

function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes >

          <Route path='/*' element={<AuthRoute> <SiteLaylout /> </AuthRoute>}>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
        </Routes>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
