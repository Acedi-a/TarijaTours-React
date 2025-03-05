


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TarjetaCredito from '../../components/TarjetaCredito';
import $ from 'jquery';

const FormularioPago = () => {
    const { idtour } = useParams();
    if (!idtour) {
        navigate('/');
        return null;
    }
    const navigate = useNavigate();
    const [tarjetas, setTarjetas] = useState([]);
    const [selectedTarjeta, setSelectedTarjeta] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTarjetas = () => {
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/card/tarjetas`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            success: (response) => {
                setTarjetas(response);
                console.log(response)
                setLoading(false);
            },
            error: (jqXHR) => {
                setError('Error al cargar las tarjetas');
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        fetchTarjetas();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTarjeta) {
            setError('Por favor seleccione una tarjeta');
            return;
        }

        // Realizar el pago
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/api/card/tarjetas`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            data: {
                tarjeta: selectedTarjeta,
            },
            success: (response) => {
                navigate('/perfil');
            },
            error: (jqXHR) => {
                setError('Error al procesar el pago');
            }
        });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Formulario de Pago</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Seleccionar Tarjeta</h2>
                    <div className="space-y-4">
                        {tarjetas.map((tarjeta) => (
                            <div 
                                key={tarjeta.id}
                                className={`border p-4 rounded cursor-pointer ${selectedTarjeta === tarjeta.id ? 'bg-blue-400 text-white' : ''}`}
                                onClick={() => setSelectedTarjeta(tarjeta.id)}
                            >
                                <p>Tarjeta terminada en: {tarjeta.display}</p>
                                <p>Titular: {tarjeta.nombre_titular}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Agregar Nueva Tarjeta</h2>
                        <TarjetaCredito onDatosChange={() => fetchTarjetas()} />
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Resumen de Pago</h2>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                        Confirmar Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormularioPago;