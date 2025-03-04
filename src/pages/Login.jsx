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
        <div
            className="w-full min-h-screen flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: "url('/bg-login.png')" }}
        >
            <div className="flex flex-col mx-auto bg-black/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-semibold text-white text-center mb-6">Iniciar Sesión</h2>

                {message && (
                    <div className={`p-3 mb-4 rounded ${status === 201 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4 ">
                        <label className="text-white text-lg mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mb-4 p-3 w-full border border-white/50 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu_correo@tarija.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-white text-lg mb-2" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="mb-6 p-3 w-full border border-white/50 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa aquí tu contraseña"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className=" w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;