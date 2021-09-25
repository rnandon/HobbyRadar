import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NewEvent from './NewEvent';


export default function FindEvents(props) {
    const allEvents = useSelector((state) => state.events.value.payload);
    let eventComponents = [];
    if (allEvents != "") {
        eventComponents = allEvents.map((event) => {
            return (
                <Link to={`/events/${event.scheduledEventId}`} className="p-5">
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>{event.hobby}</p>
                    <p>{event.date}</p>
                </Link>
            )
        });
    }

    return (
        <div className="p-5">
            <h1>
                This is the find events page.
            </h1>
            {eventComponents.length === 0 &&
                <h2>Sorry, there aren't any events right now.</h2>
            }
            <NewEvent />
            {eventComponents}
        </div>
    )
}

// scheduledEventId(pin):1
// hobbyId(pin):3
// hobby(pin):"AIRBRUSHING"
// date(pin):"2021-10-23T10:05:41.192448"
// name(pin):"Try AIRBRUSHING"
// description(pin):"Come check out AIRBRUSHING with us!"
// location(pin):"Milwaukee, WI"