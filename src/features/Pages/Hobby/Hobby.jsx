import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setUser } from '../../User/UserSlice';


export default function Hobby(props) {
    const allHobbies = useSelector((state) => state.hobbies.value.payload);
    const user = useSelector((state) => state.user.value.payload);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const history = useHistory();
    const hobbyId = props.match.params.id;
    let currentHobby;
    try {
        currentHobby = allHobbies.filter((hobby) => hobby.hobbyId == hobbyId)[0];
    } catch {
        history.push("/notfound");
    }

    async function followHobby(hobbyId) {
        const userId = user.id;
        if (!userId) {
            setStatus("You have to be logged in to do that.");
            return;
        }

        const newUserHobby = {
            UserId: userId,
            HobbyId: hobbyId
        };
        try {
            let response = await axios.post("https://localhost:44394/api/UserHobbyRatings", newUserHobby);
            if (response.data) {
                setStatus("Successfully subscribed!");
                refreshUser();
            }
        } catch {
            setStatus("Something went wrong. Please try again");
        }
    }

    async function refreshUser() {
        const userId = user.id;
        try {
            let response = await axios.get(`https://localhost:44394/api/users/${userId}`);
            if (response.data) {
                dispatch(setUser(response.data));
            }
        } catch {
            history.push("/notfound");
        }
    }


    return (
        <div>
            <h1>
                {currentHobby.name}
            </h1>
            <button onClick={() => followHobby(hobbyId)} >Follow</button>
            <h3>{status}</h3>
        </div>
    )
}