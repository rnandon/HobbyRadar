import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NewEvent from './NewEvent';


export default function FindEvents(props) {
    const allEvents = useSelector((state) => state.events.value.payload);
    let eventComponents = [];
    let [filterPhrase, setFilterPhrase] = useState("");
    let [onlyUpcoming, setOnlyUpcoming] = useState(true);
    let [filterLocation, setFilterLocation] = useState("");

    if (allEvents != "") {
        eventComponents = allEvents.map((event) => {
            const eventDate = new Date(event.date);
            const now = new Date();
            if (eventDate < now && onlyUpcoming) {
                return;
            }
            if (!event.location.toLowerCase().includes(filterLocation.toLowerCase())) {
                return;
            }
            if (!(event.location.toLowerCase().includes(filterPhrase.toLowerCase())
               || event.name.toLowerCase().includes(filterPhrase.toLowerCase())
               || event.hobby.toLowerCase().includes(filterPhrase.toLowerCase())
               || event.description.toLowerCase().includes(filterPhrase.toLowerCase())
                )) {
                return;
            }


            return (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <Link to={`/events/${event.scheduledEventId}`} className="m-3">
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <p>Main Hobby: {event.hobby}</p>
                        <p>{eventDate.toString()}</p>
                        <p>{event.location}</p>
                    </Link>
                </li>
            )
        });
    }

    return (
        <div className="m-5">
            <br />
            <h1 className="text-center m-5 p-0 page-header">
                Check out events going on!
            </h1>
            <br />
            {eventComponents.length === 0 &&
                <h2>Sorry, there aren't any events right now.</h2>
            }
            <NewEvent />
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <form className="m-3" >
                        <label htmlFor="filter">Search Events</label>
                        <input className="form-control" type="text" id="filter" name="filter" placeholder="Search" value={filterPhrase} onChange={(event) => setFilterPhrase(event.target.value)} />
                        <label htmlFor="location">Filter Location</label>
                        <input className="form-control" type="text" id="location" name="location" placeholder="Location" value={filterLocation} onChange={(event) => setFilterLocation(event.target.value)} />
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="upcomingOnly" id="upcomingOnly" checked={onlyUpcoming} onChange={() => setOnlyUpcoming(onlyUpcoming? false: true)} />
                            <label class="form-check-label" htmlFor="upcomingOnly">Only Show Upcoming Events</label>
                        </div>
                    </form>
                </li>
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