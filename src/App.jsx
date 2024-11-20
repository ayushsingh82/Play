import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Markets from './pages/Markets'
import CreateMarket from './pages/CreateMarket'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="markets" element={<Markets />} />
        <Route path="create" element={<CreateMarket />} />
      </Route>
    </Routes>
  )
}

export default App 