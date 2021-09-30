import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InviteExternal from '../../Elements/InviteExternal/InviteExternal';
import AccountEdit from './AccountEdit';
import AccountHome from './AccountHome';
import AccountMessage from './AccountMessage';


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
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#messages" type="button" role="tab" aria-controls="messages" aria-selected="false">Messages</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <AccountHome user={user} />
                            </div>
                            <div class="tab-pane fade" id="messages" role="tabpanel" aria-labelledby="contact-tab">
                                <AccountMessage user={user} />
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <AccountEdit user={user} />
                            </div>
                        </div>
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