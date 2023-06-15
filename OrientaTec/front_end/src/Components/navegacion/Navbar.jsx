import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export function Navbar({ linkInicio }) {

  let navigate = useNavigate();

  const gotoConfig = () => { navigate("/ayudaAsistente", { state: { comentarios: true, linkMenu: "/menuProfesor" } }); };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={linkInicio}>
            <img src='./orientatec-logo.jpg' width='100' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to={linkInicio} >Inicio</Link>
              <Link className="nav-link" to='/configuracionAsistente' state={{ configLinkInicio: linkInicio }}>Configuracion</Link>
              <Link className="nav-link" to="https://www.canva.com/design/DAFh5LOvdPk/zkChmy2wVH-aPhOo6BXqcA/view?utm_content=DAFh5LOvdPk&utm_campaign=designshare&utm_medium=link&utm_source=homepage_design_menu">Ayuda</Link>
              <Link className="nav-link mx-1" to='/avisos' state={{ configLinkInicio: linkInicio }}>
                Avisos
                <span class="position-absolute badge rounded-pill bg-success mx-1">!</span>
              </Link>
              <Link className="nav-link mx-3" to='/'>Cerrar sesion</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
