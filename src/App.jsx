import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGlobe, 
  FaClock, 
  FaMoneyBillWave, 
  FaMapMarkedAlt, 
  FaUsers, 
  FaSmile, 
  FaHeadset 
} from 'react-icons/fa';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reusable feature card component
  const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
    >
      <div className="text-red-600 mb-4">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  // Reusable statistic card
  const StatCard = ({ number, label }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <h4 className="text-4xl font-bold text-red-700">{number}</h4>
      <p className="text-gray-600">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-pink-600 mb-6">
            Descubre Bolivia
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sumérgete en aventuras únicas y experiencias inolvidables. Explora los destinos más impresionantes de Bolivia con nuestros guías expertos.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={FaGlobe}
            title="Destinos Únicos"
            description="Lugares mágicos y experiencias inolvidables en cada rincón de Bolivia."
            delay={0.2}
          />
          <FeatureCard 
            icon={FaClock}
            title="Tours Guiados"
            description="Guías expertos que harán de tu viaje una experiencia segura y enriquecedora."
            delay={0.4}
          />
          <FeatureCard 
            icon={FaMoneyBillWave}
            title="Precios Accesibles"
            description="Las mejores experiencias al alcance de tu presupuesto."
            delay={0.6}
          />
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-16"
        >
          <Link
            to="/tours"
            className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold 
            hover:from-red-700 hover:to-pink-700 transition-all duration-300 
            shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
          >
            Explorar Tours
          </Link>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <StatCard number="50+" label="Destinos" />
          <StatCard number="1000+" label="Clientes Felices" />
          <StatCard number="100%" label="Satisfacción" />
          <StatCard number="24/7" label="Soporte" />
        </motion.div>
      </div>
    </div>
  );
}

export default App;