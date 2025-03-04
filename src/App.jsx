import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-red-700 mb-6">
            Descubre Bolivia
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explora los destinos más increíbles de nuestro país con los mejores guías turísticos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Destinos Únicos</h3>
            <p className="text-gray-600">Lugares mágicos y experiencias inolvidables en cada rincón de Bolivia.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Tours Guiados</h3>
            <p className="text-gray-600">Guías expertos que harán de tu viaje una experiencia segura y enriquecedora.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Precios Accesibles</h3>
            <p className="text-gray-600">Las mejores experiencias al alcance de tu presupuesto.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <Link
            to="/tours"
            className="inline-block bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explorar Tours
          </Link>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <h4 className="text-4xl font-bold text-red-700">50+</h4>
              <p className="text-gray-600">Destinos</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-red-700">1000+</h4>
              <p className="text-gray-600">Clientes Felices</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-red-700">100%</h4>
              <p className="text-gray-600">Satisfacción</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-red-700">24/7</h4>
              <p className="text-gray-600">Soporte</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;