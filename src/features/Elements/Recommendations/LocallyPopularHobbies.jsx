import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function LocallyPopularHobbies() {
    let popularHobbies = useSelector((state) => state.recommendations.value);
    try {
        if (popularHobbies.payload.locallyPopularHobbies) {
            popularHobbies = popularHobbies.payload.locallyPopularHobbies;
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
                    <ol className="list-group list-group-numbered">
                        {popularHobbies.map((hobby) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <Link to={`hobbies/${hobby.hobbyId}`} className="ms-2 me-auto">
                                        <div className="fw-bold">{hobby.hobbyName}</div>
                                    </Link>
                                    <span className="badge bg-primary rounded-pill">{hobby.overallRating}</span>
                                </li>
                            )
                        })}
                    </ol>
                </Fragment>
            }
        </div>
    )
}