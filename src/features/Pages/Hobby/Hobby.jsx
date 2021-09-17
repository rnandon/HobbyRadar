import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
    useEffect(() => {
        try {
            setCurrentHobby(allHobbies.filter((hobby) => hobby.hobbyId == hobbyId));
            try {
                const uhr = user.userHobbies.filter((userHobby) => userHobby.hobbyId == hobbyId)[0];
                tempHobbyRating = uhr.userRating;
                setUserHobbyRating(uhr.userRating);
            } catch {}
        } catch {
            history.push("/notfound");
        }
    }, [])

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
            if (response.data) {
                status = "Sucessfully updated rating!";
                dispatch(setUser(response.data));
                setUserHobbyRating(rating);
            }
        } catch {
            status = "Something went wrong. Please try again.";
        }
    }

    // async function refreshUser() {
    //     const userId = user.id;
    //     try {
    //         let response = await axios.get(`https://localhost:44394/api/users/${userId}`);
    //         if (response.data) {
    //             dispatch(setUser(response.data));
    //         }
    //     } catch {
    //         history.push("/notfound");
    //     }
    // }

    const setTempRating = (value) => {
        tempHobbyRating = value;
    }


    return (
        <div>
            {!currentHobby &&
                <div>
                    <h1>Loading...</h1>
                </div>
            }

            {currentHobby &&
                <div>
                    <h1>
                        {currentHobby.name}
                    </h1>
                    {userHobbyRating !== -1 &&
                        <Fragment>
                            <p>Current rating: {userHobbyRating}</p>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={() => setTempRating(1)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">1</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={() => setTempRating(2)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2">2</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onClick={() => setTempRating(3)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio3">3</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" onClick={() => setTempRating(4)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio4">4</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" onClick={() => setTempRating(5)} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio5">5</label>
                            </div>
                            <button className="btn btn-primary" onClick={() => rateHobby(tempHobbyRating)} >Rate</button>
                            <h3>{status}</h3>
                        </Fragment>
                    }
                    {userHobbyRating === -1 &&
                        <Fragment>
                            <button onClick={() => followHobby(hobbyId)} >Follow</button>
                            <h3>{status}</h3>
                        </Fragment>
                    }
                </div>
            }
        </div>
    )
}