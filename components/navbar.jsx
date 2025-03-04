import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-red-700">Tarija Tours</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Inicio
            </Link>
            <Link to="/tours" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Tours
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Nosotros
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Contacto
            </Link>
            <button className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors duration-200">
              Reservar Ahora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Inicio
          </Link>
          <Link to="/tours" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Tours
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Nosotros
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Contacto
          </Link>
          <button className="w-full bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors duration-200 mt-2">
            Reservar Ahora
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;