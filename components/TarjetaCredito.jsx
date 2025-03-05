import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const TarjetaForm = ({ onDatosChange, initialData = {} }) => {
    const [datosTarjeta, setDatosTarjeta] = useState({
        numeroTarjeta: "",
        nombrePropietario: "",
        tipoTarjeta: "visa",
        cvv: "",
        ...initialData
    });

    const actualizarDatos = (campo, valor) => {
        const nuevosDatos = { ...datosTarjeta, [campo]: valor };
        setDatosTarjeta(nuevosDatos);
        if (onDatosChange) {
            onDatosChange(nuevosDatos);
        }
    };

    const logotipos = {
        visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png",
        mastercard: "https://cdn.freebiesupply.com/images/thumbs/2x/mastercard-logo.png",
        amex: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png",
        discover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVlKiObkc78TE6qLuV9ee1B2eIVAUCDDJ6g&s"
    };

    const Tarjeta = () => {
        return (
            <div className="text-gray-300 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-xl p-6 space-y-4 max-w-sm mx-auto">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Tarjeta de Crédito</p>
                    <img
                        className="w-16"
                        src={logotipos[datosTarjeta.tipoTarjeta]}
                        alt={`${datosTarjeta.tipoTarjeta} Logo`}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <img
                        className="w-12"
                        src="https://cdn-icons-png.flaticon.com/512/9334/9334627.png"
                        alt="Chip de Tarjeta"
                    />
                    <p className="text-2xl font-bold tracking-wider">
                        {datosTarjeta.numeroTarjeta || "#### #### #### ####"}
                    </p>
                </div>
                <div className="flex justify-between text-sm">
                    <div>
                        <p className="uppercase text-xs font-light">CVV</p>
                        <p className="text-lg">{datosTarjeta.cvv ? "***" : "---"}</p>
                    </div>
                    <div>
                        <p className="uppercase text-xs font-light">Propietario</p>
                        <p className="text-lg">{datosTarjeta.nombrePropietario || "Nombre Apellido"}</p>
                    </div>
                </div>
            </div>
        );
    };

    const Formulario = () => {
        const manejarCambio = (e) => {
            const { name, value } = e.target;
            actualizarDatos(name, value);
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            $.ajax({
                url: `${import.meta.env.VITE_API_URL}/card/tarjetas`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    numero_tarjeta: datosTarjeta.numeroTarjeta,
                    nombre_titular: datosTarjeta.nombrePropietario,
                    tipo_tarjeta: datosTarjeta.tipoTarjeta,
                    ccv: datosTarjeta.cvv
                }),
                success: (response) => {
                    console.log(response)
                },
                error: (error) => {
                    alert('Error al guardar la tarjeta');
                    console.error(error);
                }
            });
        };
    
        return (
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
                <div>
                    <label htmlFor="tipoTarjeta" className="block mb-2">Tipo de Tarjeta</label>
                    <select
                        id="tipoTarjeta"
                        name="tipoTarjeta"
                        value={datosTarjeta.tipoTarjeta}
                        onChange={manejarCambio}
                        className="w-full p-2 border rounded"
                    >
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="amex">American Express</option>
                        <option value="discover">Discover</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="numeroTarjeta" className="block mb-2">Número de Tarjeta</label>
                    <input
                        type="text"
                        id="numeroTarjeta"
                        name="numeroTarjeta"
                        value={datosTarjeta.numeroTarjeta}
                        onChange={manejarCambio}
                        placeholder="#### #### #### ####"
                        className="w-full p-2 border rounded"
                        maxLength="19"
                    />
                </div>
                <div>
                    <label htmlFor="nombrePropietario" className="block mb-2">Nombre del Propietario</label>
                    <input
                        type="text"
                        id="nombrePropietario"
                        name="nombrePropietario"
                        value={datosTarjeta.nombrePropietario}
                        onChange={manejarCambio}
                        placeholder="Nombre Completo"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="cvv" className="block mb-2">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={datosTarjeta.cvv}
                        onChange={manejarCambio}
                        placeholder="CVV"
                        className="w-full p-2 border rounded"
                        maxLength="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    Guardar Tarjeta
                </button>
            </form>
        );
    };

    return (
        <div className="space-y-10">
            <Tarjeta />
            <Formulario />
        </div>
    );
};

// Exportamos los datos de la tarjeta para que puedan ser utilizados por otros componentes

export default TarjetaForm;