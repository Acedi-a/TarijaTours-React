import React, { useEffect, useState } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCamera } from 'react-icons/fa';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("No hay sesión activa. Inicia sesión para ver tu perfil.");
            return;
        }

        $.ajax({
            url: `${import.meta.env.VITE_API_URL}/user`,
            type: "GET",
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: function (response) {
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
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewAvatar(reader.result);
        };
        reader.readAsDataURL(file);
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
                setMessage("Imagen subida correctamente.");
                localStorage.setItem("user", JSON.stringify(response));
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar: response.user.avatar,
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center relative">
                    <div className="absolute top-4 right-4">
                        <NavLink 
                            to="/perfil/editar" 
                            className="text-white hover:bg-white/20 p-2 rounded-full transition"
                        >
                            <FaEdit className="w-6 h-6" />
                        </NavLink>
                    </div>
                    
                    {/* Avatar Section */}
                    <div className="relative mx-auto w-32 h-32 mb-4">
                        <img 
                            src={user?.avatar} 
                            alt={user?.display || "User Avatar"} 
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <label 
                            htmlFor="avatar-upload" 
                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-600"
                        >
                            <FaCamera className="w-5 h-5" />
                        </label>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white">{user?.display}</h2>
                    <p className="text-white/80">{user?.email}</p>
                </div>

                {/* Profile Details */}
                <div className="p-6 space-y-4">
                    {message && (
                        <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                            {message}
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <FaUser className="w-6 h-6 text-blue-500" />
                            <span>{user?.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="w-6 h-6 text-blue-500" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhone className="w-6 h-6 text-blue-500" />
                            <span>{user?.telefono || 'No phone number'}</span>
                        </div>
                    </div>

                    {/* Avatar Upload Form */}
                    <form onSubmit={handleSubmit} className="mt-6">
                        <input
                            type="file"
                            id="avatar-upload"
                            name="avatar"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        
                        {previewAvatar && (
                            <div className="mb-4 flex justify-center">
                                <img 
                                    src={previewAvatar} 
                                    alt="Preview" 
                                    className="w-40 h-40 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}
                        
                        {previewAvatar && (
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
                            >
                                Subir Imagen
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;