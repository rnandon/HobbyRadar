import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useForm from '../../Hooks/useForm';


export default function OtherUser(props) {
    const username = props.match.params.username;
    const [user, setUser] = useState();
    const [statusMessage, setStatusMessage] = useState("");
    const loggedInUser = useSelector((state) => state.user.value.payload);
    const { formValues, handleChange, handleSubmit } = useForm(() => connect(user, loggedInUser, formValues));

    
    async function getUser() {
        let response = await axios.get(`https://localhost:44394/api/users/view/${username}`);
        if (response.data) {
            setUser(response.data);
        }
    }

    async function connect(user, loggedInUser, formValues) {
        if (loggedInUser) {
            const now = new Date();
            const newConnectionInvite = {
                fromUserId: loggedInUser.id,
                toUserId: user.id,
                message: formValues.message,
                accepted: "false",
                dateSent: now.getTime() * 10000,
                dismissed: "false"
            }
            console.log(newConnectionInvite);
            try {
                let response = await axios.post("https://localhost:44394/api/connectioninvites", newConnectionInvite);
                console.log(response);
                if (response.data) {
                    setStatusMessage("Invite sent!");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setStatusMessage("You need to be logged in to do that.");
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
                    
                    <div>
                        <h2>Like what you see? Invite them to connect!</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="message" className="form-label">Send them a message! (optional)</label>
                                <textarea className="form-control" name="message" id="message" rows="3" onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary" type="submit">Get Connected</button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h2>Hobbies this person follows:</h2>
                        <ol className="list-group">
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
                    </div>
                </Fragment>
            }
        </div>
    )
}