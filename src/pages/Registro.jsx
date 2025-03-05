import { useState } from 'react';
import $ from "jquery";

const Registro = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        telefono: ''
    });
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [list, setList] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar solicitud POST
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/user/create`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            statusCode: {
                201: function (response) {
                    console.log(response);
                    setStatus(201);
                    setMessage(response.message);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    // Redirigir después de un pequeño delay
                    setTimeout(() => window.location.href = "/perfil", 1500);
                },
                422: function (response) {
                    console.log(response.responseJSON);
                    setStatus(422);
                    setList(response.responseJSON.errors);
                },
                0: function () {
                    setStatus(0);
                    setMessage("Error en la base de datos o problema de conexión.");
                }
            }
        });
    };

    return (
        <div
        className="w-full text-white min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-login.png')" }}
    >
            <div className="flex flex-col mx-auto bg-black/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">Crear Usuario</h2>
            {status === 201 && (
                <div className="text-green-600 mb-4">{message}</div>
            )}
            {status === 422 && status !== null && (
                <div className="text-red-600 mb-4">
                    <ul className="list-disc pl-5">
                        {Object.keys(list).map((field, idx) => (
                            <li key={idx}>
                                <strong>{field}:</strong> {list[field].join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {status === 0 && status !== null && (
                <div className="text-red-600 mb-4">{message}</div>
            )}
            <form onSubmit={handleSubmit} className="text-white">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium ">Usuario</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Usuario"
                        required
                    />
                </div>

                <div className="mb-4 text-white">
                    <label htmlFor="email" className="block text-sm font-medium ">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="correo@example.com"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium ">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium ">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Nombres"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="apellido" className="block text-sm font-medium ">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Apellidos"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="telefono" className="block text-sm font-medium ">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="telefono"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Crear Usuario
                </button>
            </form>
            </div>
            
        </div>
    );
};

export default Registro;