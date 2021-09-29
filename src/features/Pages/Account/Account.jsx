import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InviteExternal from '../../Elements/InviteExternal/InviteExternal';


export default function Account(props) {
    const user = useSelector((state) => state.user.value.payload);
    let [eventFilterPhrase, setEventFilterPhrase] = useState("");
    let [eventFilterLocation, setEventFilterLocation] = useState("");
    let [eventOnlyUpcoming, setEventOnlyUpcoming] = useState(true);
    let [hobbyFilterPhrase, setHobbyFilterPhrase] = useState("");
    let [friendFilterPhrase, setFriendFilterPhrase] = useState("");

    return (
        <div className="p-5">
            {user &&
                <div>
                    <h1 className="page-header m-0 p-0">Hello, {user.firstName}!</h1>

                    <div>
                        <h2>Upcoming events:</h2>
                        {user.attendingEvents.length === 0 && 
                            <p>No events scheduled yet. Find something to do <Link to="/events" >here!</Link></p>
                        }
                        {user.attendingEvents.length > 0 &&
                            <ol className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <form className="m-3" >
                                        <label htmlFor="filter">Search Events</label>
                                        <input className="form-control" type="text" id="eventfilter" name="eventfilter" placeholder="Search" value={eventFilterPhrase} onChange={(event) => setEventFilterPhrase(event.target.value)} />
                                        <label htmlFor="location">Filter Location</label>
                                        <input className="form-control" type="text" id="eventlocation" name="eventlocation" placeholder="Location" value={eventFilterLocation} onChange={(event) => setEventFilterLocation(event.target.value)} />
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" name="eventOnlyUpcoming" id="eventOnlyUpcoming" checked={eventOnlyUpcoming} onChange={() => setEventOnlyUpcoming(eventOnlyUpcoming? false: true)} />
                                            <label class="form-check-label" htmlFor="eventOnlyUpcoming">Only Show Upcoming Events</label>
                                        </div>
                                    </form>
                                </li>
                                {user.attendingEvents.map((attending) => {
                                    const attendingDate = new Date(attending.date);
                                    const now = new Date();
                                    if (attendingDate < now && eventOnlyUpcoming) {
                                        return;
                                    }
                                    if (!attending.location.toLowerCase().includes(eventFilterLocation.toLowerCase())) {
                                        return;
                                    }
                                    if (!(attending.location.toLowerCase().includes(eventFilterPhrase.toLowerCase())
                                       || attending.name.toLowerCase().includes(eventFilterPhrase.toLowerCase())
                                       || attending.hobby.name.toLowerCase().includes(eventFilterPhrase.toLowerCase())
                                       || attending.description.toLowerCase().includes(eventFilterPhrase.toLowerCase())
                                        )) {
                                        return;
                                    }

                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <Link to={`/events/${attending.scheduledEventId}`} className="ms-2 me-auto">
                                                <div className="fw-bold">{attending.name}</div>
                                                <div>{attending.description}</div>
                                                <div>Location: {attending.location}</div>
                                                <div>Date: {attendingDate.toString()}</div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ol>
                        }
                    </div>

                    <div>
                        <h2>See what your friends are up to</h2>
                        <InviteExternal />
                        {user.connections.length === 0 &&
                            <p>You haven't added any friends yet. Find someone <Link to="/">here,</Link> or invite someone new!</p>
                        }
                        {user.connections.length > 0 &&
                            <ol className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <form className="m-3" >
                                        <label htmlFor="friendFilter">Search Friends</label>
                                        <input className="form-control" type="text" id="friendFilter" name="friendFilter" placeholder="Search" value={friendFilterPhrase} onChange={(event) => setFriendFilterPhrase(event.target.value)} />
                                    </form>
                                </li>
                                {user.connections.map((connection) => {
                                    if (!(connection.name.toLowerCase().includes(friendFilterPhrase.toLowerCase()) || connection.username.toLowerCase().includes(friendFilterPhrase.toLowerCase()))) {
                                        return;
                                    }

                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <Link to={`/people/${connection.username}`} className="ms-2 me-auto">
                                                <div className="fw-bold">{connection.username}</div>
                                                <div>{connection.name}</div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ol>
                        }
                    </div>
                        <h2>Hobbies you're interested in</h2>
                        {user.userHobbies.length === 0 &&
                            <p>You haven't followed any hobbies yet. Check <Link to="/hobbies">here</Link> to find something new!</p>
                        }
                        {user.userHobbies.length > 0 &&
                            <ol className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <form className="m-3" >
                                        <label htmlFor="hobbyFilter">Search Hobbies</label>
                                        <input className="form-control" type="text" id="hobbyFilter" name="hobbyFilter" placeholder="Search" value={hobbyFilterPhrase} onChange={(event) => setHobbyFilterPhrase(event.target.value)} />
                                    </form>
                                </li>
                                {user.userHobbies.map((hobby) => {
                                    if (!(hobby.name.toLowerCase().includes(hobbyFilterPhrase.toLowerCase())
                                       || hobby.tags.join().toLowerCase().includes(hobbyFilterPhrase.toLowerCase()))) {
                                        return;
                                    }
                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start" >
                                            <Link to={`hobbies/${hobby.hobbyId}`} className="ms-2 me-auto" >
                                                <div className="fw-bold">{hobby.name}</div>
                                            </Link>
                                        </li>
                                    )

                                })}

                            </ol>
                        
                        }
                    <div>

                    </div>
                </div>
            }
            {!user &&
                <div>
                    <h1>No user logged in.</h1>
                </div>
            }
        </div>
    )
}