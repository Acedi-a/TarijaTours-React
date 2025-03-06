import React, { useState } from 'react';
import TarjetaPreview from './TarjetaPreview';
import TarjetaForm from './TarjetaForm';
import $ from 'jquery';

const TarjetaCredito = ({ onDatosChange, initialData = {} }) => {
  const [datosTarjeta, setDatosTarjeta] = useState({
    numeroTarjeta: initialData.numeroTarjeta || "",
    nombrePropietario: initialData.nombrePropietario || "",
    tipoTarjeta: initialData.tipoTarjeta || "visa",
    cvv: initialData.cvv || ""
  });

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
        alert('Tarjeta guardada correctamente');
        if (onDatosChange) {
          onDatosChange(response);
        }
      },
      error: (error) => {
        alert('Error al guardar la tarjeta');
        console.error(error);
      }
    });
  };

  return (
    <div className="space-y-10">
      <TarjetaPreview datosTarjeta={datosTarjeta} />
      <TarjetaForm
        datosTarjeta={datosTarjeta}
        setDatosTarjeta={setDatosTarjeta}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TarjetaCredito;
