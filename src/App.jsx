import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import BettingPage from './pages/BettingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="bet" element={<BettingPage />} />
      </Route>
    </Routes>
  )
}

export default App 