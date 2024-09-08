import { Navbar } from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';

export const Layout = () => (
  <div className="flex items-center flex-col flex-2 h-screen">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);
