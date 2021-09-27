import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Recommendations.css';


export default function PopularHobbies() {
    let popularHobbies = useSelector((state) => state.recommendations.value);
    try {
        if (popularHobbies.payload.popularHobbies) {
            popularHobbies = popularHobbies.payload.popularHobbies;
        }
    } catch {
        popularHobbies = [];
    }

    return (
        <div className="col">
            {popularHobbies.length === 0 &&
                <Fragment>
                    <h4>Sorry, we can't seem to find this info right now. Check back later!</h4>
                </Fragment>
            }
            {popularHobbies.length > 0 &&
                <Fragment>
                    <ol className="list-group">
                        {popularHobbies.map((hobby) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <Link to={`hobbies/${hobby.hobbyId}`} className="ms-2 me-auto fw-bold">
                                        {hobby.hobbyName} <span className="badge bg-blue rounded-pill mx-3">Overall Rating: {hobby.overallRating}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </Fragment>
            }
        </div>
    )
}