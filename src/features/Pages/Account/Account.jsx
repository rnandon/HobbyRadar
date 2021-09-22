import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Account(props) {
    const user = useSelector((state) => state.user.value.payload);
    console.log(user);

    return (
        <div>
            {user &&
                <div>
                    <h1>Hello, {user.firstName}!</h1>
                    <h1>{user.userName}</h1>

                    <div>
                        <h2>Upcoming events:</h2>
                        {user.attendingEvents.length === 0 && 
                            <p>No events scheduled yet. Find something to do <Link to="/events" >here!</Link></p>
                        }
                        {user.attendingEvents.length > 0 &&
                            <ol className="list-group list-group-numbered">
                                {user.attendingEvents.map((attending) => {
                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <Link to={`/events/${attending.username}`} className="ms-2 me-auto">
                                                <div className="fw-bold">{attending.name}</div>
                                                <div>{attending.description}</div>
                                                <div>Location: {attending.location}</div>
                                                <div>Date: {attending.date}</div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ol>
                        }
                    </div>

                    <div>
                        <h2>See what your friends are up to</h2>
                        {user.connections.length === 0 &&
                            <p>You haven't added any friends yet. Find someone <Link to="/people">here,</Link> or invite someone new!</p>
                        }
                        {user.connections.length > 0 &&
                            <ol className="list-group list-group-numbered">
                                {user.connections.map((connection) => {
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
                            <ol className="list-group list-group-numbered">
                                {user.userHobbies.map((hobby) => {
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