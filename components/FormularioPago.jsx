import React, { useState } from 'react';

const FormularioPago = () => {
    const [formData, setFormData] = useState({
        numero_tarjeta: '',
        nombre_titular: '',
        ccv: '',
        tipo_tarjeta: 'Debito',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            estado: 'Activo',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null
        };
        console.log('Form Data Submitted:', dataToSubmit);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-red-600 px-6 py-8">
                        <h2 className="text-2xl font-bold text-white text-center">Información de Pago</h2>
                        <p className="mt-2 text-red-100 text-center">Por favor, ingrese los datos de su tarjeta</p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Número de Tarjeta
                            </label>
                            <input
                                type="text"
                                name="numero_tarjeta"
                                value={formData.numero_tarjeta}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Titular
                            </label>
                            <input
                                type="text"
                                name="nombre_titular"
                                value={formData.nombre_titular}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder="Nombre como aparece en la tarjeta"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CCV
                                </label>
                                <input
                                    type="text"
                                    name="ccv"
                                    value={formData.ccv}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    placeholder="123"
                                    maxLength="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de Tarjeta
                                </label>
                                <select
                                    name="tipo_tarjeta"
                                    value={formData.tipo_tarjeta}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                >
                                    <option value="Debito">Débito</option>
                                    <option value="Credito">Crédito</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300 font-medium"
                        >
                            Procesar Pago
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormularioPago;