import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./src/App.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Tours from "./components/Tours.jsx";
import Login from "./src/pages/Login.jsx";
import Registro from "./src/pages/Registro.jsx";

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
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Rutas;