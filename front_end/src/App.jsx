import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MenuAsistente } from "./Components/menuAsistentes/menuAsistente";
import { VerActividades } from "./Components/menuAsistentes/AsistenteOpciones/verActividades";

export function App() {
    return (
    <Router>
        <div className="App">
            <Routes>
                <Route exact path = "/" element = {<MenuAsistente/>}/>
                <Route exact path = "/verplan" element = {<VerActividades/>}/>
            </Routes>
        </div>
    </Router>
    )
    
}