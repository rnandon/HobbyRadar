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
                    <p>{currentEvent.date}</p>
                    <p>{currentEvent.location}</p>
                    {attendees}
                </Fragment>
            }
            {!userIsAttending && <button onClick={attendEvent}>Register</button>}
            {userIsAttending && <button onClick={cancelAttendance}>Cancel Registration</button>}
        </div>
    )
}