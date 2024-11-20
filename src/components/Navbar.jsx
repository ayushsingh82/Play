import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-primary">
            PredictTrends
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/markets" className="btn">
              Markets
            </Link>
            <Link to="/create" className="btn btn-primary">
              Create Market
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 