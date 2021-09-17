import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    let attendees;

    useEffect(() => {
        try {
            const thisEvent = allEvents.filter((event) => event.ScheduledEventId === eventId);
            setCurrentEvent(allEvents.filter((event) => event.ScheduledEventId === eventId));
            const attendees = thisEvent.Attendees.map((attendee) => {
                return (
                    <p>{attendee.UserFirstName} {attendee.UserLastInitial}</p>
                )
            })
            try {
                const thisUserAttendance = user.attendingEvents.filter((event) => event.ScheduledEventId === eventId);
                setUserIsAttending(true);
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
            ScheduledEventId: eventId
        };
        try {
            let response = await axios.post("https://localhost:44394/api/user/event", newEventAttendance);
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
        let response = await axios.delete(`https://localhost:44394/api/EventAttendances?eventId=${eventId}&userid=${user.id}`)
        status = "Successfully canceled registration!";
    }


    return (
        <div>
            {!currentEvent && 
                <h1>Loading...</h1>
            }

            {currentEvent && 
                <div>
                    <h1>{currentEvent.Name}</h1>
                    <p>{currentEvent.Description}</p>
                    <p>{currentEvent.Date}</p>
                    <p>{currentEvent.Location}</p>
                    {attendees}
                </div>
            }
            {!userIsAttending && <button onClick={attendEvent}>Register</button>}
            {userIsAttending && <button onClick={cancelAttendance}>Cancel Registration</button>}
        </div>
    )
}