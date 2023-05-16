import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./Components/login/Login";
import { Recuperar } from "./Components/login/Recuperar";
import { MenuAsistente } from "./Components/menuAsistentes/menuAsistente";
import { VerActividades } from "./Components/menuAsistentes/AsistenteOpciones/verActividades";
import { DetalleActividad } from "./Components/menuAsistentes/AsistenteOpciones/verActividades/DetalleActividad";
import { ConsultarEstudiantes } from "./Components/menuAsistentes/AsistenteOpciones/ConsultarEstudiantes";
import { ConsultarProfesores } from "./Components/menuAsistentes/AsistenteOpciones/ConsultarProfesores";
import  { ConsultarEquipo } from "./Components/menuAsistentes/AsistenteOpciones/ConsultarEquipo"
import { AsignarCoordinador } from "./Components/menuAsistentes/AsistenteOpciones/AsignarCoordinador";
import { DarBajaProfesor } from "./Components/menuAsistentes/AsistenteOpciones/DarBajaProfesor";
import { AgregarProfesor } from "./Components/menuAsistentes/AsistenteOpciones/AgregarProfesor";
import { ModificarProfesor} from "./Components/menuAsistentes/AsistenteOpciones/ModificarProfesor";
import { Configuracion } from "./Components/navegacion/Configuracion";
import { MenuProfesor } from "./Components/menuProfesor/MenuProfesor";
import { ConsultarEstudiantesP } from "./Components/menuProfesor/ProfesorOpciones/ConsultarEstudiantesP";
import { ModificarEstudiante } from "./Components/menuProfesor/ProfesorOpciones/ModificarEstudiante";
import { MenuProfesorC } from "./Components/menuPC/menuProfesorC";
import { ModificarActividad } from "./Components/menuPC/CoordinadorOpciones/ModificarActividad";
import { ActividadCancelada } from "./Components/menuPC/CoordinadorOpciones/modificarActividad/ActividadCancelada";
import { CrearActividad } from "./Components/menuPC/CoordinadorOpciones/CrearActividad";
import { DefinirPlan } from "./Components/menuPC/CoordinadorOpciones/DefinirPlan";
import { EvidenciasActividad } from "./Components/menuAsistentes/AsistenteOpciones/verActividades/EvidenciasActividad";

export function App() {
    return (
    <Router>
        <div className="App">
            <Routes>
                <Route exact path= "/" element = {<Login/>} />
                <Route exact path= "/recuperar" element = {<Recuperar/>} />
                <Route exact path = "/menuAsistente" element = {<MenuAsistente/>}/>
                <Route exact path = "/verplan" element = {<VerActividades/>}/>
                <Route exact path = "/verplan/detalle" element = {<DetalleActividad/>}/>
                <Route exact path = "/verplan/detalle/evidencias" element = {<EvidenciasActividad/>}/>
                <Route exact path = "/infoestudiantes" element = {<ConsultarEstudiantes/>}/>
                <Route exact path = "/infoprofesores" element = {<ConsultarProfesores/>}/>
                <Route exact path = "/infoequipo" element = {<ConsultarEquipo/>}/>
                <Route exact path="/asignarcoordinador" element={<AsignarCoordinador/>}/>
                <Route exact path="/darbajaprofesor" element={<DarBajaProfesor/>}/>
                <Route exact path="/agregarprofesor" element={<AgregarProfesor/>}/>
                <Route exact path="/modificarProfesor" element={<ModificarProfesor/>}/>
                <Route exact path="/configuracionAsistente" element={<Configuracion/>}/>

                <Route exact path = "/menuProfesor" element = {<MenuProfesor/>}/>
                <Route exact path = "/consultarestudiantesp" element = {<ConsultarEstudiantesP/>}/>
                <Route exact path = "/modificarEstudiante" element = {<ModificarEstudiante/>}/>

                <Route exact path = "/menuCoordinador" element = {<MenuProfesorC/>}/>
                <Route exact path = "/modificarActividad" element = {<ModificarActividad/>}/>
                <Route exact path = "/cancelarActividad" element = {<ActividadCancelada/>}/>
                <Route exact path = "/crearActividad" element = {<CrearActividad/>}/>
                <Route exact path = "/definirPlan" element = {<DefinirPlan/>}/>
            </Routes>
        </div>
    </Router>
    )
    
}