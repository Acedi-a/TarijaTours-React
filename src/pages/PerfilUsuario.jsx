import React, { useEffect, useState } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

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
                Authorization: `Bearer ${token}`,
            },
            success: function (response) {
                console.log(response);
                setUser(response);
                localStorage.setItem("id", JSON.stringify(response.id));
                localStorage.setItem("user", JSON.stringify(response));
            },
            error: function (error) {
                setMessage("Error al obtener los datos del usuario.");
                console.log("Error al cargar el perfil:", error);
            }
        });
    }, []);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const id = localStorage.getItem("id");

        if (!token || !avatar) {
            setMessage("Por favor selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", avatar);

        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/user/avatar/${id}`,
            type: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
                setMessage("Imagen subida correctamente.");
                localStorage.setItem("user", JSON.stringify(response));
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar: response.user.avatar, // Actualiza la imagen en el estado
                }));
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            },
            error: function (error) {
                console.log("Error al subir la imagen:", error);
                setMessage("Error al subir la imagen.");
            },
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Perfil del Usuario</h2>

                {message && (
                    <div className="p-3 mb-4 rounded bg-red-500 text-white">
                        {message}
                    </div>
                )}

                {user ? (
                    <div>
                        <p className="mb-2"><strong>Usuario:</strong> {user.name}</p>
                        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                        <p className="mb-2"><strong>Nombres:</strong> {user.display}</p>
                        <p className="mb-2"><strong>Teléfono:</strong> {user.telefono}</p>
                        <img src={user.avatar} alt={user.display} />
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Subir Avatar</label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Subir Imagen
                            </button>
                        </form>
                        <NavLink to="/perfil/editar">Editar</NavLink>
                    </div>
                ) : (
                    !message && <p>Cargando perfil...</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;