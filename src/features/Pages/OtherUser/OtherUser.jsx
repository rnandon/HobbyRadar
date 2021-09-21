import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function OtherUser(props) {
    const username = props.match.params.username;
    const [user, setUser] = useState();
    
    async function getUser() {
        let response = await axios.get(`https://localhost:44394/api/users/view/${username}`);
        if (response.data) {
            setUser(response.data);
        }
    }

    useEffect(() => {getUser()}, []);

    return (
        <div>
            {!user &&
                <Fragment>
                    <h2>Loading...</h2>
                </Fragment>
            }
            {user &&
                <Fragment>
                    <h1>{user.username}</h1>
                    <h2>{user.name}</h2>
                    <h2>Hobbies this person follows:</h2>
                    <ol className="list-group list-group-numbered">
                        {user.hobbies.map((hobby) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <Link to={`/hobbies/${hobby.hobbyId}`} className="ms-2 me-auto">
                                        <div className="fw-bold">{hobby.name}</div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </Fragment>
            }
        </div>
    )
}