import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setUser } from '../../User/UserSlice';


export default function Event(props) {
    const allEvents = useSelector((state) => state.events.value.payload);
    const user = useSelector((state) => state.user.value.payload);
    const dispatch = useDispatch();
    let status = "";
    const history = useHistory();
    const eventId = props.match.params.id;
    let [currentEvent, setCurrentEvent] = useState();
    let [userIsAttending, setUserIsAttending] = useState(false);
    let [attendees, setAttendees] = useState();
    let [userToInvite, setUserToInvite] = useState();

    useEffect(() => {
        try {
            const thisEvent = allEvents.filter((event) => event.scheduledEventId == eventId)[0];
            setCurrentEvent(thisEvent);
            if (thisEvent.attendees.length > 0){
                const attendeeComponents = thisEvent.attendees.map((attendee) => {
                    return (
                        <p>{attendee.userFirstName} {attendee.userLastInitial}</p>
                    )
                })
                setAttendees(attendeeComponents);
            } else {
                setAttendees(<p>Nobody is registered for this event yet. Be the first!</p>);
            }
            try {
                const thisUserAttendance = user.attendingEvents.filter((event) => event.scheduledEventId == eventId);
                if (thisUserAttendance.length > 0) {setUserIsAttending(true);}
            } catch {}
        } catch {
            history.push("/notfound");
        }
    }, [])

    async function attendEvent() {
        let userId;
        try {
            userId = user.id;
        } catch {
            status = "You have to be logged in to do that.";
            return;
        }
        const newEventAttendance = {
            UserId: userId,
            ScheduledEventId: parseInt(eventId)
        };
        console.log(newEventAttendance);
        try {
            let response = await axios.post("https://localhost:44394/api/users/event", newEventAttendance);
            if (response.data) {
                dispatch(setUser(response.data));
                setUserIsAttending(true);
                status = "Successfully registered!";
            }
        } catch {
            status = "Something went wrong. Please try again.";
        }
    }

    async function cancelAttendance() {
        let response = await axios.delete(`https://localhost:44394/api/eventAttendances?eventId=${eventId}&userId=${user.id}`)
        setUserIsAttending(false);
        status = "Successfully canceled registration!";
    }

    async function inviteConnection(event) {
        event.preventDefault();
        const link = `https://hobbyradar.co/events/${eventId}`

        let userAlert = {
            userId: userToInvite,
            message: `Your friend ${user.firstName} thinks you might like an event! Check it out here: ${link}`
        }
        let response = await axios.post("https://localhost:44394/api/userAlerts", userAlert);
        if (response.data){
            status = "Invite sent!";
        }
    }


    return (
        <div>
            {!currentEvent && 
                <Fragment>
                    <h1>Loading...</h1>
                </Fragment>
            }

            {currentEvent && 
                <Fragment>
                    <h1>{currentEvent.name}</h1>
                    <p>{currentEvent.description}</p>
                    <p>{currentEvent.hobby}</p>
                    <p>{currentEvent.date}</p>
                    <p>{currentEvent.location}</p>
                    {attendees}
                    {user.connections.length > 0 &&
                        <Fragment>
                            <h2>Notice somebody missing?</h2>
                            <p>Invite a friend!</p>
                            <form classname="mb-3" onSubmit={inviteConnection}>
                                <select  className="form-select" name="friend" required="true" aria-label="Friend selector" onChange={(event) => setUserToInvite(event.target.value)}>
                                    <option value="">Select a friend!</option>
                                    {user.connections.map((connection) => {
                                        return <option value={connection.id}>{connection.name}</option>
                                    })}
                                </select>
                                <button className="btn btn-primary" type="submit">Invite Friend</button>
                            </form>
                        </Fragment>
                    }
                </Fragment>
            }
            {!userIsAttending && <button onClick={attendEvent}>Register</button>}
            {userIsAttending && <button onClick={cancelAttendance}>Cancel Registration</button>}
        </div>
    )
}