import React, {Fragment, useState, useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function BarraLateral() {
    const [date, setDate] = useState(new Date());
    return (
        <Fragment>
            <div className="m-3 p-2 bg-light">
                <img src="https://www.sickchirpse.com/wp-content/uploads/2013/11/Snakes-In-Hats-4.jpg" class="img-thumbnail w-100"/>
                <p className="text-center">Juana Maria Antonieta</p>
                <p className="text-center">04:30 p.m.</p>
                <Calendar onChange={setDate} value={date}/>
            </div>
        </Fragment>
    )
}