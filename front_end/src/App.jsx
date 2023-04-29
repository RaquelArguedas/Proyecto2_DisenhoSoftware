import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MenuAsistente } from "./Components/menuAsistentes/menuAsistente";
import { VerActividades } from "./Components/menuAsistentes/AsistenteOpciones/verActividades";
import { DetalleActividad } from "./Components/menuAsistentes/AsistenteOpciones/verActividades/DetalleActividad";
import { ConsultarEstudiantes } from "./Components/menuAsistentes/AsistenteOpciones/ConsultarEstudiantes";
//@ts-ignore
import { ConsultarProfesores } from "./Components/menuAsistentes/AsistenteOpciones/ConsultarProfesores";
import  { ConsultarEquipo } from "./Components/menuAsistentes/AsistenteOpciones/ConsultarEquipo"

export function App() {
    return (
    <Router>
        <div className="App">
            <Routes>
                <Route exact path = "/" element = {<MenuAsistente/>}/>
                <Route exact path = "/verplan" element = {<VerActividades/>}/>
                <Route exact path = "/verplan/detalle" element = {<DetalleActividad/>}/>
                <Route exact path = "/infoestudiantes" element = {<ConsultarEstudiantes/>}/>
                <Route exact path = "/infoprofesores" element = {<ConsultarProfesores/>}/>
                <Route exact path = "/infoequipo" element = {<ConsultarEquipo/>}/>
            </Routes>
        </div>
    </Router>
    )
    
}