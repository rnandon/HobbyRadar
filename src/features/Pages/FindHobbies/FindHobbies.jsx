import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NewHobby from './NewHobby';


export default function FindHobbies(props) {
    const allHobbies = useSelector((state) => state.hobbies.value.payload);
    let hobbyComponents = [];
    let [filterPhrase, setFilterPhrase] = useState("");

    try {
        hobbyComponents = allHobbies.map((hobby) => {
            if (!(hobby.name.toLowerCase().includes(filterPhrase.toLowerCase())
               || hobby.tags.join().toLowerCase().includes(filterPhrase.toLowerCase()))) {
                   return;
               }

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
            <h1 className="text-center m-5 page-header p-0">
                Find something new to try!
            </h1>
            <br />
            <NewHobby />
            <ol className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <form className="m-3" >
                        <label htmlFor="filter">Search Hobbies</label>
                        <input className="form-control" type="text" id="filter" name="filter" placeholder="Search" value={filterPhrase} onChange={(event) => setFilterPhrase(event.target.value)} />
                    </form>
                </li>
                {hobbyComponents}
            </ol>
        </div>
    )
}