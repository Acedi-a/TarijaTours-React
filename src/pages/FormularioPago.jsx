import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TarjetaCredito from '../../components/TarjetaCredito';
import $ from 'jquery';
import { CreditCard, Lock, ChevronRight, Plus, Check } from 'lucide-react';

const realizarReserva = (id_tour_actividad) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert("No tienes autorización para hacer una reserva.");
        return false;
    }

    return new Promise((resolve, reject) => {
        const data = {
            id_tour_actividades: [
                id_tour_actividad
            ]
        };

        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/reservas`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: (response) => {
                resolve(response);
            },
            error: (jqXHR) => {
                reject(jqXHR.responseText);
            }
        });
    });
};

const RealizarPago = (tarjetaSeleccionada, idTour) => {
    const token = localStorage.getItem('token'); 

    return new Promise((resolve, reject) => {
        const data = {
            tarjeta: tarjetaSeleccionada,
            id_reservas: [
                idTour
            ]
        }

        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/pagar/reservas`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: (response) => {
                resolve(response);
            },
            error: (jqXHR) => {
                reject(jqXHR.responseText);
            }
        });
    });
};

const FormularioPago = () => {
    const [selectedTarjeta, setSelectedTarjeta] = useState('');
    const { idtour } = useParams();
    const navigate = useNavigate();
    const [tarjetas, setTarjetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const [tourDetails, setTourDetails] = useState({
        nombre: "Tour de Aventura",
        precio: "$150",
        fecha: "25/03/2025",
        imagen: "/api/placeholder/400/200"
    });

    // Redirigir si no hay ID de tour
    useEffect(() => {
        if (!idtour) {
            navigate('/');
        }
    }, [idtour, navigate]);

    const fetchTarjetas = () => {
        setLoading(true);
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/card/tarjetas`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            success: (response) => {
                setTarjetas(response);
                // Seleccionar automáticamente la primera tarjeta si hay alguna
                if (response.length > 0 && !selectedTarjeta) {
                    setSelectedTarjeta(response[0].id);
                }
                setLoading(false);
            },
            error: (jqXHR) => {
                setError('Error al cargar las tarjetas. Por favor, inténtalo de nuevo más tarde.');
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        fetchTarjetas();
        // Aquí podríamos agregar una llamada para obtener los detalles del tour si es necesario
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTarjeta) {
            setError('Por favor seleccione una tarjeta para continuar');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            await realizarReserva(idtour);
            await RealizarPago(selectedTarjeta, idtour);
            
            alert('Pago realizado con éxito');
            setIsProcessing(false);
        } catch (errorMsg) {
            setError(`Ocurrió un error: ${errorMsg}`);
            setIsProcessing(false);
        }
    };

    const toggleNewCardForm = () => {
        setShowNewCardForm(!showNewCardForm);
    };

    const handleCardAdded = () => {
        fetchTarjetas();

    };

    if (loading && !tarjetas.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando información de pago...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-blue-600 text-white pt-16 pb-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Finalizar Reserva</h1>
                    <p className="text-blue-100">Completa tu reserva para asegurar tu lugar en esta experiencia inolvidable</p>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-8">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sección de Tarjetas */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-semibold mb-6 flex items-center">
                                <CreditCard className="mr-2 text-blue-500" size={20} />
                                Método de Pago
                            </h2>

                            {tarjetas.length > 0 ? (
                                <div className="space-y-3 mb-8">
                                    {tarjetas.map((tarjeta) => (
                                        <div 
                                            key={tarjeta.id}
                                            className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                                                selectedTarjeta === tarjeta.id 
                                                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                                                    : 'border-gray-200'
                                            }`}
                                            onClick={() => setSelectedTarjeta(tarjeta.id)}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                                                    selectedTarjeta === tarjeta.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                                }`}>
                                                    {selectedTarjeta === tarjeta.id && <Check size={12} className="text-white" />}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-medium">•••• •••• •••• {tarjeta.display}</p>
                                                    <p className="text-sm text-gray-600">{tarjeta.nombre_titular}</p>
                                                </div>
                                                <div className="text-blue-500">
                                                    <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none">
                                                        <rect width="48" height="48" rx="6" fill="#E7F0FF" />
                                                        <path d="M32 24H16M16 24L22 18M16 24L22 30" stroke="#1366E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-gray-50 rounded-lg mb-6">
                                    <p className="text-gray-500 mb-4">No tienes tarjetas guardadas</p>
                                </div>
                            )}

                            <div className="mb-8">
                                <button 
                                    onClick={toggleNewCardForm}
                                    className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                >
                                    <Plus size={20} className="mr-2" />
                                    {showNewCardForm ? 'Ocultar formulario' : 'Agregar nueva tarjeta'}
                                </button>
                            </div>

                            {showNewCardForm && (
                                <div className="border border-blue-200 rounded-lg p-6 bg-blue-50 mb-8">
                                    <h3 className="text-lg font-medium mb-4">Agregar Nueva Tarjeta</h3>
                                    <TarjetaCredito onDatosChange={handleCardAdded} />
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-6">
                                <h2 className="text-xl font-semibold mb-6">Resumen de la Reserva</h2>
                                
                                <div className="mb-6">
                                    <img 
                                        src={tourDetails.imagen} 
                                        alt="Imagen del tour" 
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="font-bold text-lg">{tourDetails.nombre}</h3>
                                    <p className="text-gray-600 mb-2">Fecha: {tourDetails.fecha}</p>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Precio del tour</span>
                                        <span>{tourDetails.precio}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{tourDetails.precio}</span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleSubmit}
                                    disabled={isProcessing || !selectedTarjeta}
                                    className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center
                                        ${isProcessing || !selectedTarjeta
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'} 
                                        transition-colors`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                                            Procesando...
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={18} className="mr-2" />
                                            Confirmar y Pagar
                                        </>
                                    )}
                                </button>
                                
                                <div className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
                                    <Lock size={14} className="mr-1" />
                                    Pago seguro y encriptado
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormularioPago;