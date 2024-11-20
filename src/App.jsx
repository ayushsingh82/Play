import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Markets from './pages/Markets'
import CreateMarket from './pages/CreateMarket'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/create" element={<CreateMarket />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 