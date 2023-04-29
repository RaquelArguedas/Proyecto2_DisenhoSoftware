import React, { Fragment } from 'react'

export function Comentario() {
    return (
        <Fragment>
            <div className="card m-3">
                <div className="card-body">
                    <h6 id="comentarioNombre" className="card-title">Nombre Apellido Apellido</h6>

                    <div className="row">
                        <div className="col-lg">
                            <p id="comentarioDatetime" className="text-secondary mb-2">                        
                                28/04/2023 03:02 p.m
                            </p>
                        </div>
                        <div className="col-sm-2 d-flex justify-content-end">
                            <a href="#" className="card-text link-success">Responder</a>
                        </div>
                    </div>

                    <p id="comentarioContent" className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptas quo recusandae sint, quidem in quam nihil voluptatem,
                         nesciunt consequuntur fuga dicta! Aut pariatur cumque accusamus exercitationem cupiditate earum iure.
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
