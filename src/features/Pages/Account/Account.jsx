import React from 'react';
import { useSelector } from 'react-redux';


export default function Account(props) {
    const user = useSelector((state) => state.user.value.payload);
    console.log(user);

    return (
        <div>
            {user &&
                <div>
                    <h1>{user.userName}</h1>
                </div>
            }
            {!user &&
                <div>
                    <h1>No user logged in.</h1>
                </div>
            }
        </div>
    )
}