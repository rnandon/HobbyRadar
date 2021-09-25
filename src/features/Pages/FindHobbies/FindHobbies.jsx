import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NewHobby from './NewHobby';


export default function FindHobbies(props) {
    const allHobbies = useSelector((state) => state.hobbies.value.payload);
    let hobbyComponents = [];
    try {
        hobbyComponents = allHobbies.map((hobby) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <Link to={`/hobbies/${hobby.hobbyId}`} className="m-3">
                        <h2>{hobby.name}</h2>
                        <p>Tags: {hobby.tags.join(", ")}</p>
                    </Link>
                </li>
            )
        });
    } catch {
        
    }

    return (
        <div className="m-5">
            <br />
            <h1 className="text-center m-5">
                Find something new to try!
            </h1>
            <br />
            <NewHobby />
            <ol className="list-group">
                {hobbyComponents}
            </ol>
        </div>
    )
}