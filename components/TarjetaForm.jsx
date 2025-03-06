import React from 'react';

const TarjetaForm = ({ datosTarjeta, setDatosTarjeta, onSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosTarjeta(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-4">
      <div>
        <label htmlFor="tipoTarjeta" className="block mb-2">Tipo de Tarjeta</label>
        <select
          id="tipoTarjeta"
          name="tipoTarjeta"
          value={datosTarjeta.tipoTarjeta}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          placeholder="#### #### #### ####"
          className="w-full p-2 border rounded"
          maxLength="16"
        />
      </div>
      <div>
        <label htmlFor="nombrePropietario" className="block mb-2">Nombre del Propietario</label>
        <input
          type="text"
          id="nombrePropietario"
          name="nombrePropietario"
          value={datosTarjeta.nombrePropietario}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          placeholder="CVV"
          className="w-full p-2 border rounded"
          maxLength="3"
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

export default TarjetaForm;
