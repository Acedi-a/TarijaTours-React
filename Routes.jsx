import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./src/App.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Tours from "./components/Tours.jsx";


const Rutas = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/tours" element={<Tours/>} />
                <Route path="/tours/:idtour" element={<Tours/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Rutas;