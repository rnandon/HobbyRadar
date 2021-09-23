import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useForm from "../../Hooks/useForm";
import { setEvents } from "../Event/EventSlice";

export default function NewEvent() {
    const history = useHistory();
    const { formValues, handleChange, handleSubmit } = useForm(() => postEvent(formValues));
    let events = useSelector((state) => state.events.value.payload);
    const hobbies = useSelector((state) => state.hobbies.value.payload);
    const dispatch = useDispatch();

    async function postEvent(values) {
        let newEvent = {
            HobbyId: values.hobby,
            Name: values.name,
            Description: values.description,
            Location: values.location,
            Date: getDate(values)
        };


        let response = await axios.post("https://localhost:44394/api/ScheduledEvents", newEvent);
        if (response.data) {
            newEvent.scheduledEventId = parseInt(response.data.scheduledEventId);
            newEvent.Date = response.data.date;
            newEvent.HobbyId = parseInt(response.data.hobbyId);

            let allEvents = [...events, newEvent];
            dispatch(setEvents(allEvents));
        }
    }

    function getDate(values) {
        console.log("Raw values: ");
        console.log(values);

//          date: "2021-09-30"
//          description: "It's a neat little thingy"
//          hobby: "12"
//          hour: "5"
//          location: "place"
//          minutes: "00"
        let ymd = values.date.split("-");
        const year = parseInt(ymd[0])
        const month = parseInt(ymd[1])
        const day = parseInt(ymd[2])
        const hour = parseInt(values.hour) + (values.dayPart == "PM" ? 12 : 0);
        const minutes = parseInt(values.minutes);

        
        const eventDate = new Date(year, month, day, hour, minutes, 0, 0);
        console.log(eventDate.toString());

        const ticks = eventDate.getTime() * 10000;
        return ticks;
    }

    const modifySelectedHobby = (event) => {
        let currentValue = []
        if (formValues.tags) {
            currentValue = formValues.tags;
        }

        // If the value is in the list, we need to remove it. Otherwise, add it.
        if (currentValue.includes(event.target.name)) {
            currentValue = currentValue.filter((tag) => tag != event.target.name);
        } else {
            currentValue.push(event.target.name);
        }
        const formPass = {
            target: {
                name: "hobby",
                value: currentValue
            },
            persist: () => {}
        }
        handleChange(formPass);
    }


    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span>New Event</span>
                </button>
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Schedule a New Event</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form className="mb-3" onSubmit={handleSubmit} >
                            <input className="form-control form-control-lg" type="text" required="true" placeholder="Event Name" name="name" onChange={handleChange} />
                            {hobbies.length === 0 &&
                                <h2>Loading...</h2>
                            }
                            {hobbies.length > 0 &&
                                <div className="row">
                                    {hobbies.map((hobby) => {
                                        return (
                                            <div className="col m-0 p-1">
                                                <input className="btn-check" type="radio" id={hobby.hobbyId} name="hobby" value={hobby.hobbyId} autoComplete="off" onClick={handleChange}/>
                                                <label className="btn btn-outline-primary" htmlFor={hobby.hobbyId}>{hobby.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            <input className="form-control form-control-lg" type="text" required="true" placeholder="Event Description" name="description" onChange={handleChange} />
                            <input className="form-control form-control-lg" type="text" required="true" placeholder="Event Location" name="location" onChange={handleChange} />
                            <div className="row">
                                <input className="form-control col" type="date" min="2020-09-01" required="true" name="date" onChange={handleChange} />
                                <select className="form-select col" name="hour" required="true" aria-label="Default select example" onChange={handleChange} >
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select className="form-select col" name="minutes" required="true" aria-label="Minutes selector" onChange={handleChange} >
                                    <option value="00" selected>:00</option>
                                    <option value="15" >:15</option>
                                    <option value="30" >:30</option>
                                    <option value="45" >:45</option>
                                </select>
                                <select className="form-select col" name="dayPart" required="true" aria-label="AM/PM selector" onChange={handleChange} >
                                    <option value="AM" selected>AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary" type="submit">Save Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>


        
    )
}