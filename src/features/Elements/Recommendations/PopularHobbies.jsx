import { Fragment } from "react";
import { useSelector } from "react-redux";


export default function PopularHobbies() {
    let popularHobbies = useSelector((state) => state.recommendations.value);
    if (popularHobbies !== "") {
        popularHobbies = popularHobbies.payload.popularHobbies;
    }
    console.log("Popular Hobbies: ");
    if (popularHobbies) {
        console.log(popularHobbies);
    }

    return (
        <div>
            <h3>See what everyone else is into</h3>
            {popularHobbies.length === 0 &&
                <Fragment>
                    <h4>Sorry, we can't seem to find this info right now. Check back later!</h4>
                </Fragment>
            }
            {popularHobbies.length > 0 &&
                <Fragment>
                    {popularHobbies.map((hobby) => {
                        return <h4>{hobby.hobbyName}</h4>
                    })}
                </Fragment>
            }
        </div>
    )
}