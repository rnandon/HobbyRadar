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
    let [isConnected, setIsConnected] = useState(false);

    async function getUser() {
        let response = await axios.get(`https://localhost:44394/api/users/view/${username}`);
        if (response.data) {
            setUser(response.data);
            try {
                const existingConnections = loggedInUser.connections;
                const connectionIds = existingConnections.map((connection) => {return connection.id});
                if (connectionIds.includes(response.data.id)) {
                    setIsConnected(true);
                }
            } catch {}
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

    async function disconnect(user, loggedInUser) {
        try {
            let response = await axios.delete(`https://localhost:44394/api/connections?user1Id=${loggedInUser.id}&user2Id=${user.id}`);
            if (response.data) {
                isConnected = false;
            }
        } catch {}
    }

    useEffect(() => {getUser()}, []);

    return (
        <div className="m-5">
            {!user &&
                <Fragment>
                    <h2>Loading...</h2>
                </Fragment>
            }
            {user &&
                <Fragment>
                    <h1>{user.username}</h1>
                    <h2>{user.name}</h2>
                    {!isConnected &&
                        <div>
                            <h2>Like what you see? Invite them to connect!</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Send them a message! (optional)</label>
                                    <textarea className="form-control" name="message" id="message" rows="3" onChange={handleChange}></textarea>
                                </div>
                                <div className="col-12">
                                    <button className="btn bg-blue" type="submit">Get Connected</button>
                                </div>
                            </form>  
                        </div> 
                    }
                    {isConnected &&
                        <Fragment>
                            <button className="btn bg-blue" type="button" onClick={() => {disconnect(loggedInUser, user)}}>Disconnect</button>
                        </Fragment>
                    }
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