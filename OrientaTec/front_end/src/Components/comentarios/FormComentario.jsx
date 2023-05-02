import React, { Fragment } from 'react'

export function FormComentario() {
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <textarea className="w-100" style={{resize: "none", height: "5rem"}} aria-label="With textarea" maxlength="250"></textarea>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-outline-success">Comentar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
