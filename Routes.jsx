import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./src/App.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Tours from "./components/Tours.jsx";
import Login from "./src/pages/Login.jsx";
import Registro from "./src/pages/Registro.jsx";
import PerfilEditar from "./src/pages/PerfilEditar.jsx";
import UserProfile from "./src/pages/PerfilUsuario.jsx";
import FormularioPago from "./src/pages/FormularioPago.jsx";
import About from "./src/pages/About.jsx";
import Progresando from "./src/pages/Progresando.jsx";

const Rutas = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/tours" element={<Tours/>} />
                <Route path="/tours/:idtour" element={<Tours/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/registro" element={<Registro/>} />
                <Route path="/perfil" element={<UserProfile/>} />
                <Route path="/perfil/editar" element={<PerfilEditar/>} />
                <Route path="/pago/:idtour" element={<FormularioPago/>}/>
                <Route path="/about" element={<About/>} />
                <Route path="/404" element={<Progresando/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Rutas;