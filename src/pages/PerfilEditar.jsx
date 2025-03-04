import { useState, useEffect } from 'react';
import $ from "jquery";

const PerfilEditar = () => {
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
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setMessage("No hay sesión activa. Inicia sesión para ver tu perfil.");
            return;
        }

        // Obtener los datos del usuario
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/user`,
            type: "GET",
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${token}`
            },
            success: function (response) {
                console.log(response);
                // Pre-poblar el formulario con los datos del usuario
                setFormData({
                    name: response.name,
                    email: response.email,
                    password: '',  // No pre-poblar la contraseña por seguridad
                    nombre: response.nombre,
                    apellido: response.apellido,
                    telefono: response.telefono
                });
            },
            error: function () {
                setMessage("Error al obtener los datos del usuario.");
            }
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        const id = localStorage.getItem("id");
        e.preventDefault();
        // Enviar solicitud POST para actualizar los datos del usuario
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/user/edit/${id}`,
            type: "PUT",
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: JSON.stringify(formData),
            statusCode: {
                200: function (response) {
                    console.log(response);
                    setStatus(200);
                    setMessage("Perfil actualizado con éxito.");
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
            {status === 200 && (
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
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Usuario</label>
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

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="********"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
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
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
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
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
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
                    Actualizar Perfil
                </button>
            </form>
        </div>
    );
};

export default PerfilEditar;