import React, { useState } from "react";
import $ from "jquery"; // Asegúrate de tener jQuery instalado

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica de validación
        if (!email || !password) {
            setMessage("Por favor, ingresa todos los campos.");
            return;
        }

        // Simulando la consulta con jQuery
        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/login`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            statusCode: {
                200: function (response) {
                    console.log(response);
                    setStatus(201);
                    setMessage(response.message);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    // Redirigir después de un pequeño delay
                    setTimeout(() => window.location.href = "/", 1500);
                },
                400: function (response) {
                    console.log(response.responseJSON);
                    setStatus(400);
                    setMessage(response.responseJSON.error.password);
                },
                401: function (response) {
                    console.log(response.responseJSON);
                    setStatus(401);
                    setMessage(response.responseJSON.error);
                },
                0: function () {
                    setStatus(0);
                    setMessage("Error en la base de datos o problema de conexión.");
                }
            }
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

                {message && (
                    <div className={`p-3 mb-4 rounded ${status === 201 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;