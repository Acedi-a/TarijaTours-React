import React from 'react';

const TarjetaPreview = ({ datosTarjeta }) => {
  const logotipos = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png",
    mastercard: "https://cdn.freebiesupply.com/images/thumbs/2x/mastercard-logo.png",
    amex: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png",
    discover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVlKiObkc78TE6qLuV9ee1B2eIVAUCDDJ6g&s"
  };


  return (
    <div className="text-gray-300 bg-gradient-to-br from-blue-700 to-cyan-500 rounded-2xl shadow-xl p-6 space-y-4 max-w-sm mx-auto">
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

export default TarjetaPreview;
