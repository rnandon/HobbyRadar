import React from 'react';
import { useSelector } from 'react-redux';


export default function Hobby(props) {
    const allHobbies = useSelector((state) => state.hobbies.value.payload);
    const hobbyId = props.match.params.id;
    let currentHobby = allHobbies.filter((hobby) => hobby.hobbyId == hobbyId)[0];
    return (
        <h1>
            {currentHobby.name}
        </h1>
    )
}