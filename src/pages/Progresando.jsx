import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaHardHat, FaWineBottle, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Progresando = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center max-w-lg w-full"
      >
        <div className="flex justify-center space-x-4 mb-6">
          <FaTools className="text-red-600 text-4xl" />
          <FaHardHat className="text-red-600 text-4xl" />
          <FaWineBottle className="text-red-600 text-4xl" />
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Sitio en Construcción
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Estamos trabajando arduamente para crear una experiencia digital 
          tan fascinante como nuestros tours por Tarija. Próximamente 
          descubrirás todos nuestros secretos y aventuras.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 italic">
            "Grandes obras requieren tiempo. Como un buen vino, nuestro sitio web 
            está siendo cuidadosamente elaborado."
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <FaEnvelope className="text-red-600 mr-3" />
            <span className="text-gray-700">contacto@tarijatours.com</span>
          </div>
          <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <FaPhoneAlt className="text-red-600 mr-3" />
            <span className="text-gray-700">+591 74553638</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center text-gray-600"
      >
      </motion.div>
    </div>
  );
};

export default Progresando;