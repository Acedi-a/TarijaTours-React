import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import TourCard from './TourCard.jsx';
import $ from 'jquery';
import { IoClose, IoLocationSharp, IoCalendarOutline, IoPeopleOutline, IoCompassOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';


const Modal = ({ tour, onClose }) => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(tour.tour.portada);
    
    const allPhotos = [tour.tour.portada, ...tour.tour.fotos];

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
                >
                    <div className="relative">
                        <img 
                            src={currentImage} 
                            alt={tour.tour.nombre} 
                            className="w-full h-full object-cover rounded-l-2xl"
                        />
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                            <h2 className="text-3xl font-bold mb-2">{tour.tour.nombre}</h2>
                            <div className="flex items-center">
                                <IoLocationSharp className="mr-2 w-5 h-5" />
                                <p className="text-lg">{tour.tour.destino}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 overflow-y-auto space-y-6">
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <IoClose className="w-8 h-8" />
                        </button>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                                <IoCalendarOutline className="mr-2 text-red-600" />
                                <div>
                                    <p className="text-xs text-gray-500">Fecha de Inicio</p>
                                    <p className="font-semibold">{tour.tour.fecha_inicio}</p>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                                <IoPeopleOutline className="mr-2 text-red-600" />
                                <div>
                                    <p className="text-xs text-gray-500">Cupos Disponibles</p>
                                    <p className="font-semibold">{tour.tour.cupos_disponibles}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3 flex items-center">
                                <IoCompassOutline className="mr-2 text-red-600" /> 
                                Descripción del Tour
                            </h3>
                            <div 
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: tour.tour.descripcion }}
                            />
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">Precio Total</p>
                                    <p className="text-2xl font-bold text-red-600">${tour.tour.precio}</p>
                                </div>
                                <button 
                                    onClick={() => navigate(`/pago/${tour.actividades[0].tour_actividad.id}`)}
                                    className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors flex items-center"
                                >
                                    Reservar Ahora <IoCompassOutline className="ml-2" />
                                </button>
                            </div>

                            <div className="flex space-x-2 overflow-x-auto mt-4">
                                {allPhotos.map((foto, index) => (
                                    <img 
                                        key={index} 
                                        src={foto} 
                                        alt={`Foto ${index + 1}`}
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer 
                                            ${currentImage === foto ? 'border-2 border-red-500' : 'opacity-70 hover:opacity-100'}`}
                                        onClick={() => setCurrentImage(foto)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
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
            $.ajax({
                url: `${import.meta.env.VITE_API_URL}/pages/tours`,
                method: 'GET',
                dataType: 'json',
                success: (response) => {
                    setTours(response.tours);
                    setLoading(false);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    setError(`Error: ${textStatus} - ${errorThrown}`);
                    setLoading(false);
                }
            });

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
                    Tours disponibles
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
                >
Desde grandes paisajes hasta experiencias inolvidables, descubre la magia de sus viñedos, sus pintorescas colinas y la calidez de su gente. Déjate envolver por el encanto de la ciudad y su rica cultura mientras creas recuerdos únicos en cada rincón                </motion.p>

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