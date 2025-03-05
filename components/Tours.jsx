import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TourCard from './TourCard.jsx';
import $ from 'jquery';

const Modal = ({ tour, onClose }) => {
    const navigate = useNavigate();
    console.log(tour);
    return (
        <div className=" bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto">
                {/* Botón de cierre */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    X
                </button>

                {/* Información principal del Tour */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-extrabold text-gray-800">{tour.tour.nombre}</h2>
                    <p className="text-lg text-gray-600 italic">{tour.tour.destino}</p>

                    {/* Imagen de portada del tour */}
                    <img src={tour.tour.portada} alt={tour.tour.nombre} className="w-full h-72 object-cover rounded-md" />

                    {/* Descripción del tour */}
                    <div className="text-gray-700">
                        <h3 className="font-semibold text-xl mb-2">Descripción:</h3>
                        <div className=""
                            dangerouslySetInnerHTML={{ __html: tour.tour.descripcion }}
                        />
                    </div>

                    {/* Información adicional */}
                    <div className="flex space-x-8 mt-4">
                        <div>
                            <h3 className="font-semibold text-lg">Precio:</h3>
                            <p className="text-xl text-red-600">${tour.tour.precio}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Fecha de Inicio:</h3>
                            <p className="text-gray-600">{tour.tour.fecha_inicio}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Fecha de Fin:</h3>
                            <p className="text-gray-600">{tour.tour.fecha_fin}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Cupos disponibles</h3>
                            <p className="text-gray-600">{tour.tour.cupos_disponibles}</p>
                        </div>
                    </div>

                    <div className="flex gap-1">
                        {tour.tour.fotos.map((foto) =>(
                                <img src={foto} className="w-50" />
                        ))}
                    </div>

                    {/* Actividades relacionadas */}
                    <div>
                        <h3 className="text-xl font-semibold mt-6">Actividades:</h3>
                        <ul className="space-y-4 mt-4">
                            {tour.actividades.map((actividad, index) => (
                                <li key={actividad.actividad.id} className="border-t pt-4">
                                    <h4 className="text-lg font-semibold text-gray-800">{actividad.actividad.nombre}</h4>
                                    <div className="text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: actividad.actividad.descripcion }}
                                    />
                                    <div className="mt-2">
                                        <img
                                            src={actividad.actividad.fotos[0]}
                                            alt={actividad.actividad.nombre}
                                            className="w-full h-48 object-cover rounded-md mt-2"
                                        />
                                    </div>
                                    <div className="flex space-x-8 mt-4">
                                        <div>
                                            <h5 className="font-semibold">Duración:</h5>
                                            <p>{actividad.actividad.duracion} minutos</p>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold">Lugar:</h5>
                                            <p>{actividad.tour_actividad.lugar}</p>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold">Precio Total:</h5>
                                            <p className="text-red-600">${actividad.tour_actividad.precio_total}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold">Guía:</h3>
                                        <div className="flex items-center mt-4">
                                            <img src={actividad.guia.avatar} alt="Guía" className="w-16 h-16 rounded-full mr-4" />
                                            <div>
                                                <h4 className="font-semibold text-lg">{actividad.guia.display}</h4>
                                                <p className="text-gray-600">Guía turístico de confianza</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button 
                            onClick={() => navigate(`/pago/${tour.actividades[0].tour_actividad.id}`)}
                            className="bg-red-600 text-white p-3 w-full hover:bg-red-700 transition-colors"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tours = () => {
    const { idtour } = useParams();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTour, setSelectedTour] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTours = () => {
            // Primero obtén todos los tours
            $.ajax({
                url: `${import.meta.env.VITE_API_URL}/pages/tours`,
                method: 'GET',
                dataType: 'json',
                success: (response) => {
                    setTours(response.tours.data);
                    setLoading(false);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    setError(`Error: ${textStatus} - ${errorThrown}`);
                    setLoading(false);
                }
            });

            // Si existe idtour, hace la consulta para obtener los detalles de ese tour
            if (idtour) {
                console.log(idtour)
                $.ajax({
                    url: `${import.meta.env.VITE_API_URL}/pages/tours/${idtour}`,
                    method: 'GET',
                    dataType: 'json',
                    success: (response) => {

                        console.log("Larespuestaes: ")
                        console.log(response)
                        setSelectedTour(response);
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        setError(`Error: ${textStatus} - ${errorThrown}`);
                    }
                });
            }
        };

        fetchTours();
    }, [idtour]);

    const closeModal = () => {
        setSelectedTour(null);  // Cierra el modal
        navigate("/tours");
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-700"></div>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-red-600 text-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-center">{error}</p>
            </div>
            <button
                onClick={() => window.location.reload()}
                className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800 transition-all duration-300 shadow-lg"
            >
                Try Again
            </button>
        </div>
    );


    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-red-700"
                >
                    Discover Amazing Tours
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
                >
                    Explore our handpicked selection of unforgettable adventures and create memories that will last a lifetime.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour, index) => (
                        <TourCard key={tour.id} tour={tour} index={index} />
                    ))}
                </div>
                {selectedTour && (
                    <Modal tour={selectedTour} onClose={closeModal} />
                )}
            </div>
        </div>
    );
};


export default Tours;