import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

export function CardProf({btnColor, btnText}) {
    let navigate = useNavigate();

    return (
        <Fragment>
            <div className="card m-3">
                <div className="card-body">
                    <h5 className="card-title m-2">Datos del profesor</h5>

                    <p id="nombreCoordinador" className='card-text m-2'>Nombre Apellido Apellido</p>

                    <p id="sedeCoordinador" className="card-text m-2">
                        <Icon icon="mdi:office-building" width="24" height="24" />
                        Campus Central Cartatgo
                    </p>

                    <p id="telefCoordinador" className="card-text m-2">
                        <Icon icon="mdi:telephone-outline" width="24" height="24" />
                        8888-8888 (0000)
                    </p>

                    <p id="correoCoordinador" className="card-text m-2">
                        <Icon icon="ic:baseline-email" width="24" height="24" />
                        correo@mail.com
                    </p>

                    <p id="oficinaCoordinador" className="card-text m-2">
                        <Icon icon="material-symbols:location-on" width="24" height="24" />
                        A3-01
                    </p>

                    <btn class={"my-3 btn btn-" + btnColor}>{btnText}</btn>
                </div>
            </div>
        </Fragment>
    )
}
