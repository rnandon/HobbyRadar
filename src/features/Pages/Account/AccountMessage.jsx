import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AccountMessage(props) {
    const user = props.user
    const dispatch = useDispatch();
    const [usersThatSentInvites, setUsersThatSentInvites] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);


    useEffect(() => {
        getUsersThatSentInvites();
        getAllNotifications();
    }, [])

    // Combine all invites and messages
    // Create an entry for each one
    // - Needs to have: 
    // - - Accept if invite
    // - - Dismiss button

    async function getUsersThatSentInvites() {
        try {
            let response = axios.get(`https://localhost:44394/api/ConnectionInvites/to/${user.id}/users`)
            if (response.data) {
                setUsersThatSentInvites(response.data);
            }
        } catch (ex) {
            alert(ex);
            setUsersThatSentInvites([]);
        }
    }

    const dismissConnectionInvite = async (notificationId) => {
        return;
    }

    const dismissEventInvite = async (notificationId) => {
        return;
    }

    const acceptConnectionInvite = async (notificationId) => {
        return;
    }

    const getAllNotifications = () => {
        let currentNotifications = [];
        // Invites received => invitesReceived
        user.invitesReceived.forEach((element) => {
            if (element.dismissed) {
                return;
            }
            let relevantUser = usersThatSentInvites.filter((sender) => sender.id === element.fromUserId);
            if (relevantUser.length === 0) {
                return;
            } else if (relevantUser.length > 0) {
                relevantUser = relevantUser[0];
            }
            const notification = (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <p>From: <Link to={`people/${relevantUser.id}`} >{relevantUser.name}</Link></p>
                    <p>{element.message}</p>
                    <button className="btn bg-blue" onClick={() => acceptConnectionInvite(element.connectionInviteId)} >Accept</button>
                    <button className="btn bg-blue" onClick={() => dismissConnectionInvite(element.connectionInviteId)} >Dismiss</button>
                </li>
            )
            currentNotifications.push(notification);
        })
        // UserAlerts => alerts
        user.alerts.forEach((element) => {
            if (element.dismissed) {
                return;
            }
            const notification = (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <p>{element.message}</p>
                    <button className="btn bg-blue" onClick={() => dismissEventInvite(element.userAlertId)}>Dismiss</button>
                </li>
            )
            currentNotifications.push(notification);
        })

        setAllNotifications(currentNotifications);
    }

    

    return (
        <div className="accordion m-5 p-5" id="recommendations">
            <div className="accordion-item">
                <h2 className="accordion-header" id="connectionRecommendationsHeader">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#connectionRecommendations" aria-expanded="false" aria-controls="connectionRecommendations" >
                        Messages
                    </button>
                </h2>
                <div id="connectionRecommendations" className="accordion-collapse collapse " aria-labelledby="connectionRecommendationsHeader" data-bs-parent="#recommendations">
                    <div className="accordion-body">
                        {allNotifications.length === 0 && 
                            <p>No messages right now.</p>
                        } 
                        {allNotifications.length > 0 &&
                            <ol className="list-group">
                                {allNotifications}
                            </ol>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}