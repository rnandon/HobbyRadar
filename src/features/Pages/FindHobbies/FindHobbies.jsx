import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function FindHobbies(props) {
    const allHobbies = useSelector((state) => state.hobbies.value.payload);
    let hobbyComponents = [];
    if (allHobbies) {
        hobbyComponents = allHobbies.map((hobby) => {
            const hobbyTags = hobby.tags.map((tag) => {
                return (
                    <p>   {tag}   </p>
                )
            })
            return (
                <Link to={`/hobbies/${hobby.hobbyId}`}>
                    <h2>{hobby.name}</h2>
                    <div>
                        {hobbyTags}
                    </div>
                </Link>
            )
        });
    }

    return (
        <div>
            <h1>
                This is the find hobbies page.
            </h1>
            {hobbyComponents}
        </div>
    )
}