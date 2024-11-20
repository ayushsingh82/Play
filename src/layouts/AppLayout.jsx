import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AppLayout() {
  return (
    <div className="min-h-screen bg-blue-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout; 