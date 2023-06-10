import React, { Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icons from 'react-bootstrap-icons';

export function FormComentario() {
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <textarea className="w-100" style={{resize: "none", height: "5rem"}} aria-label="With textarea" maxlength="250"></textarea>
                    </div>
                    <div className="col-sm-2">
                        <Icons.ChatDots />{' '}
                        <button className="btn btn-outline-success">Enviar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
