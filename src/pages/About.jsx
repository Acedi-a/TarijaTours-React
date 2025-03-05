import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaWineGlass, FaMountain, FaCameraRetro } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const About = () => {
  const experiences = [
    {
      icon: <FaWineGlass className="text-red-600 text-4xl mb-4" />,
      title: "Tours de Viñedos",
      description: "Sumérgete en la rica tradición vinícola de Tarija. Recorre los viñedos más prestigiosos, degusta vinos excepcionales y aprende sobre la milenaria cultura del vino en nuestra región."
    },
    {
      icon: <FaMountain className="text-red-600 text-4xl mb-4" />,
      title: "Aventuras en la Naturaleza",
      description: "Explora los paisajes impresionantes de Tarija. Desde las serranías hasta los valles, cada rincón cuenta una historia de belleza natural y biodiversidad única."
    },
    {
      icon: <FaCameraRetro className="text-red-600 text-4xl mb-4" />,
      title: "Experiencias Culturales",
      description: "Sumérgete en la auténtica cultura tarijeña. Descubre tradiciones ancestrales, artesanía local, gastronomía tradicional y la cálida hospitalidad de nuestra gente."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">

      <main className="container mx-auto px-4 py-8 space-y-16">
        <section className="text-center max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-6 text-red-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Descubre el Corazón de Tarija
          </motion.h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Taria Tours no es solo una agencia de viajes, somos narradores de historias, exploradores apasionados que transforman cada viaje en una experiencia única. 
            Nuestro compromiso va más allá de mostrar lugares: buscamos conectarte con el alma de Tarija, sus paisajes misteriosos, su rica cultura y sus tradiciones ancestrales.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {exp.icon}
              <h3 className="text-2xl font-semibold mb-4 text-red-600">{exp.title}</h3>
              <p className="text-gray-600">{exp.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="/bg-about.webp"
            alt="Tarija paisaje"
            className="w-full rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div>
            <motion.h3
              className="text-3xl font-semibold mb-4 text-red-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Un Destino, Mil Historias
            </motion.h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Tarija es un mosaico de experiencias: vinos que hablan de terruño, montañas que susurran leyendas, 
              valles que guardan secretos ancestrales. Cada rincón de nuestra tierra es una invitación a la aventura, 
              a la conexión profunda con un territorio que desafía la imaginación y alimenta el espíritu del viajero.
            </p>
            <NavLink to="/tours" className="bg-red-700 p-4 rounded-lg items-center">
              <span className="text-2xl font-bold text-white">Explora nuestros tours</span>
            </NavLink>
          </div>
        </section>

        <section>
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
              center={[-21.5355, -64.7292]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[-21.5355, -64.7292]}>
                <Popup>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-red-600 mr-2" />
                    Taria Tours<br />
                    Tu punto de partida hacia la aventura.
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;