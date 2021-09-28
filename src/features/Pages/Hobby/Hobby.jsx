import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import getKeys from '../../ApiKeys';
import { setUser } from '../../User/UserSlice';


export default function Hobby(props) {
    const allHobbies = useSelector((state) => state.hobbies.value.payload);
    const user = useSelector((state) => state.user.value.payload);
    const dispatch = useDispatch();
    let status = ""
    const [userHobbyRating, setUserHobbyRating] = useState(-1);
    let tempHobbyRating = 0;
    const history = useHistory();
    const hobbyId = props.match.params.id;
    let [currentHobby, setCurrentHobby] = useState();
    let [viewMap, setViewMap] = useState(false);
    let [mapLocation, setMapLocation] = useState("");
    const apiKeys = getKeys();
    let [similarHobbies, setSimilarHobbies] = useState([]);

    useEffect(() => {
        try {
            const selectedHobby = allHobbies.filter((hobby) => hobby.hobbyId == hobbyId)[0];
            getSimilarHobbies();
            setCurrentHobby(selectedHobby);
            try {
                const uhr = user.userHobbies.filter((userHobby) => userHobby.hobbyId == hobbyId)[0];
                tempHobbyRating = uhr.userRating;
                setUserHobbyRating(uhr.userRating);
            } catch {}
        } catch {
            history.push("/notfound");
        }
    }, [hobbyId])

    async function getSimilarHobbies() {
        let response = await axios.get(`https://localhost:44394/api/recommender/related/${hobbyId}`);
        if (response.data) {
            setSimilarHobbies(response.data);
        }
    }

    async function followHobby(hobbyId) {
        const userId = user.id;
        if (!userId) {
            status = "You have to be logged in to do that.";
            return;
        }

        const newUserHobby = {
            UserId: userId,
            HobbyId: hobbyId
        };
        try {
            let response = await axios.post("https://localhost:44394/api/users/uhr", newUserHobby);
            if (response.data) {
                status = "Successfully subscribed!";
                dispatch(setUser(response.data));
                setUserHobbyRating(0);
            }
        } catch {
            status = "Something went wrong. Please try again.";
        }
    }

    async function rateHobby(rating) {
        const hobbyToUpdate = {
            "UserId": user.id,
            "HobbyId": parseInt(hobbyId),
            "Rating": rating,
        };
        console.log(hobbyToUpdate);
        try {
            let response = await axios.put("https://localhost:44394/api/users/uhr", hobbyToUpdate);
            console.log(response);
            if (response.data) {
                status = "Sucessfully updated rating!";
                dispatch(setUser(response.data));
                setUserHobbyRating(rating);
            }
        } catch {
            status = "Something went wrong. Please try again.";
        }
    }

    async function deleteHobby(id) {
        try {
            let response = await axios.delete(`https://localhost:44394/api/userhobbyratings?userId=${user.id}&hobbyId=${id}`);
            if (response.data == "") {
                status = "Successfully unfollowed hobby.";
                let hobbyIndex = user.userHobbies.findIndex((hobby) => hobby.hobbyId == id);
                let newHobbies = user.userHobbies.filter((hobby, index) => index !== hobbyIndex);

                const tempUser = { ...user, userHobbies: newHobbies };
                dispatch(setUser(tempUser));

                setUserHobbyRating(-1);
            }
        } catch (ex) {
            console.log(ex);
            status = "Something went wrong. Please try again."
        }
    }

    const setTempRating = (value) => {
        tempHobbyRating = value;
    }

    return (
        <div className="m-5">
            {!currentHobby &&
                <div>
                    <h1>Loading...</h1>
                </div>
            }

            {currentHobby &&
                <Fragment>
                    <h1 className="page-header">
                        {currentHobby.name}
                    </h1>
                    <h2>Tags:</h2>
                    <div className="row">
                        {currentHobby.tags.map((tag) => {
                            return (
                                <div className="col-sm-2">
                                    {tag}
                                </div>
                            )
                        })}
                    </div>
                    {userHobbyRating !== -1 &&
                        <Fragment>
                            <p>Current rating: {userHobbyRating}</p>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => setTempRating(1)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">1</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => setTempRating(2)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2">2</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => setTempRating(3)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio3">3</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => setTempRating(4)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio4">4</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" onClick={() => setTempRating(5)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio5">5</label>
                            </div>
                            <button className="btn bg-blue" onClick={() => rateHobby(tempHobbyRating)} >Rate</button>
                            <h3>{status}</h3>
                            <button className="btn bg-blue" onClick={() => deleteHobby(currentHobby.hobbyId)} >Unfollow</button>
                        </Fragment>
                    }
                    {userHobbyRating === -1 &&
                        <Fragment>
                            <button className="btn bg-blue" onClick={() => followHobby(hobbyId)} >Follow</button>
                            <h3>{status}</h3>
                        </Fragment>
                    }
                    <form onSubmit={(event) => {event.preventDefault();setViewMap(true)}}>
                        <input className="form-control" type="text" value={mapLocation} onChange={(event) => {event.preventDefault();setMapLocation(event.target.value);}} placeholder="Enter a location" />
                        <button className="btn bg-blue" type="submit">Search</button>
                    </form>
                    {viewMap &&
                        <Fragment>
                            <iframe
                                width="600"
                                height="450"
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/search?key=${apiKeys.google}&q=${mapLocation.replace(" ", "+")}+${currentHobby.name}`}>
                            </iframe>
                        </Fragment>
                    }
                    {similarHobbies.length > 0 &&
                        <Fragment>
                            <h2>Similar Hobbies: </h2>
                            <ol className="list-group">
                                {similarHobbies.map((hobby) => {
                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <Link to={`${hobby.hobbyId}`} className="ms-2 me-auto fw-bold">
                                                {hobby.hobbyName} <span className="badge bg-primary rounded-pill mx-3">Common Tags: {hobby.score}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ol>
                    </Fragment>
                    }
                </Fragment>
            }
        </div>
    )
}