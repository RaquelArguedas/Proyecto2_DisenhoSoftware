import React, { Fragment } from 'react'
import { CardActPlan } from './CardActPlan';

export function ListaPlan() {

    return (
        <Fragment>
            <div className="input-group my-3">
                <CardActPlan/>
                <CardActPlan/>
                <CardActPlan/>
            </div >
        </Fragment >
    )
}