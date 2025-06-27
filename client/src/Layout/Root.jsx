import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
