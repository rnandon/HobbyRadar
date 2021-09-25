import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NewEvent from './NewEvent';


export default function FindEvents(props) {
    const allEvents = useSelector((state) => state.events.value.payload);
    let eventComponents = [];
    if (allEvents != "") {
        eventComponents = allEvents.map((event) => {
            const eventDate = new Date(event.date);

            return (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <Link to={`/events/${event.scheduledEventId}`} className="px-5 py-2">
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <p>Main Hobby: {event.hobby}</p>
                        <p>{eventDate.toString()}</p>
                    </Link>
                </li>
            )
        });
    }

    return (
        <div className="m-5">
            <br />
            <h1 className="text-center m-5">
                Check out events going on!
            </h1>
            <br />
            {eventComponents.length === 0 &&
                <h2>Sorry, there aren't any events right now.</h2>
            }
            <NewEvent />
            <ol className="list-group">
                {eventComponents}
            </ol>
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