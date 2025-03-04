


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TourDetalle = ({ tour }) => {
    const [activeImage, setActiveImage] = useState(tour.portada);
    
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <Link to="/tours" className="inline-flex items-center text-red-700 hover:text-red-800 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Tours
                </Link>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-xl overflow-hidden shadow-lg mb-4"
                        >
                            <img 
                                src={activeImage || tour.portada || 'https://via.placeholder.com/800x600?text=Tour+Image'} 
                                alt={tour.nombre}
                                className="w-full h-96 object-cover"
                            />
                        </motion.div>
                        
                        {tour.fotos && tour.fotos.length > 0 && (
                            <div className="grid grid-cols-4 gap-2">
                                <div 
                                    className={`cursor-pointer rounded-lg overflow-hidden ${activeImage === tour.portada ? 'ring-2 ring-red-700' : ''}`}
                                    onClick={() => setActiveImage(tour.portada)}
                                >
                                    <img 
                                        src={tour.portada} 
                                        alt="Main" 
                                        className="w-full h-20 object-cover"
                                    />
                                </div>
                                {tour.fotos.map((foto, index) => (
                                    <div 
                                        key={index}
                                        className={`cursor-pointer rounded-lg overflow-hidden ${activeImage === foto ? 'ring-2 ring-red-700' : ''}`}
                                        onClick={() => setActiveImage(foto)}
                                    >
                                        <img 
                                            src={foto} 
                                            alt={`Tour photo ${index + 1}`} 
                                            className="w-full h-20 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mr-2">
                                    {tour.destino}
                                </span>
                                {tour.cupos_disponibles && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {tour.cupos_disponibles} spots available
                                    </span>
                                )}
                            </div>
                            
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{tour.nombre}</h1>
                            
                            <div className="flex items-center mb-6">
                                <div className="flex items-center mr-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-600">
                                        {new Date(tour.fecha_inicio).toLocaleDateString()} - {new Date(tour.fecha_fin).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                {tour.precio && (
                                    <div className="text-2xl font-bold text-red-700">
                                        ${tour.precio}
                                    </div>
                                )}
                            </div>
                            
                            <div className="prose prose-lg max-w-none mb-8">
                                {tour.descripcion ? (
                                    <div dangerouslySetInnerHTML={{ __html: tour.descripcion }} />
                                ) : (
                                    <p className="text-gray-500 italic">No description available</p>
                                )}
                            </div>
                            
                            <button className="w-full bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-red-800 transition-colors duration-300 shadow-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book This Tour
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetalle;