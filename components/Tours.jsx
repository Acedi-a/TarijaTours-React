import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TourCard from './TourCard.jsx';

const Tours = () => {
    const { idtour } = useParams();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTour, setSelectedTour] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/pages/tours');
                if (!response.ok) {
                    throw new Error('Failed to fetch tours');
                }
                const responseData = await response.json();
                setTours(responseData.tours.data);
                
                if (idtour) {
                    const tour = responseData.tours.data.find(t => t.id === parseInt(idtour));
                    setSelectedTour(tour);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTours();
    }, [idtour]);

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
            </div>
        </div>
    );
};




export default Tours;