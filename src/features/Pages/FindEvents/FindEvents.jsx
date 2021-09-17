import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function FindEvents(props) {
    const allEvents = useSelector((state) => state.events.value.payload);
    let eventComponents = [];
    if (allEvents) {
        eventComponents = allEvents.map((event) => {
            return (
                <Link to={`/events/${event.ScheduledEventId}`}>
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>{event.hobby}</p>
                    <p>{event.date}</p>
                </Link>
            )
        });
    }

    return (
        <div>
            <h1>
                This is the find events page.
            </h1>
            {eventComponents.length === 0 &&
                <h2>Sorry, there aren't any events right now.</h2>
            }
            {eventComponents}
        </div>
    )
}