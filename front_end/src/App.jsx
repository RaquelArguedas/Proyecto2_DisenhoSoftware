import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MenuAsistente } from "./Components/menuAsistentes/menuAsistente";
import { VerActividades } from "./Components/menuAsistentes/AsistenteOpciones/verActividades";
import { DetalleActividad } from "./Components/menuAsistentes/AsistenteOpciones/verActividades/DetalleActividad";

export function App() {
    return (
    <Router>
        <div className="App">
            <Routes>
                <Route exact path = "/" element = {<MenuAsistente/>}/>
                <Route exact path = "/verplan" element = {<VerActividades/>}/>
                <Route exact path = "/verplan/detalle" element = {<DetalleActividad/>}/>
            </Routes>
        </div>
    </Router>
    )
    
}