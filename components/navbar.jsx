import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from "jquery";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');

    // Realizar la solicitud de logout usando jQuery
    $.ajax({
      url: `${import.meta.env.VITE_API_URL}/logout`,
      type: "POST",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los headers
      },
      success: function (response) {
        // Si la respuesta es exitosa, limpiar el localStorage y redirigir al login
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null); // Si usas un estado de usuario, como en React
        window.location.href = '/';
      },
      error: function (xhr, status, error) {
        // Manejo de errores, por ejemplo, si el token es inválido
        console.error("Error al cerrar sesión:", error);
      }
    });
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-red-700">Tarija Tours</span>
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Inicio
            </NavLink>
            <NavLink to="/tours" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Tours
            </NavLink>
            <NavLink to="/about" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Nosotros
            </NavLink>
            <NavLink to="/contact" className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Contacto
            </NavLink>
            <button className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors duration-200">
              Reservar Ahora
            </button>
          </div>

          {user ? (
            <div className="relative">
              <button className="flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{user.display}</div>
                <NavLink to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Ver Perfil
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Registrarse
              </NavLink>
            </>
          )}

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
          <NavLink to="/" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Inicio
          </NavLink>
          <NavLink to="/tours" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Tours
          </NavLink>
          <NavLink to="/about" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Nosotros
          </NavLink>
          <NavLink to="/contact" className="text-gray-700 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium">
            Contacto
          </NavLink>
          <button className="w-full bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors duration-200 mt-2">
            Reservar Ahora
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;