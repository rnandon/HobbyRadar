import React from 'react';
import { useSelector } from 'react-redux';


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
                <div>
                    <h2>{hobby.name}</h2>
                    <div>
                        {hobbyTags}
                    </div>
                </div>
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