import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function RelatedHobbyRecommendations() {
    let relatedHobbies = useSelector((state) => state.recommendations.value);
    try {
        if (relatedHobbies.payload.relatedHobbies) {
            relatedHobbies = relatedHobbies.payload.relatedHobbies;
        }
    } catch {
        relatedHobbies = [];
    }

    return (
        <div className="col">
            {relatedHobbies.length === 0 &&
                <Fragment>
                    <h4>Sorry, we can't find any good recommendations for you right now. Check back soon!</h4>
                </Fragment>
            }
            {relatedHobbies.length > 0 &&
                <Fragment>
                    <ol className="list-group list-group-numbered">
                        {relatedHobbies.map((hobby) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <Link to={`hobbies/${hobby.hobbyId}`} className="ms-2 me-auto">
                                        <div className="fw-bold">{hobby.hobbyName}</div>
                                    </Link>
                                    <span className="badge bg-primary rounded-pill">{hobby.score}</span>
                                </li>
                            )
                        })}
                    </ol>
                </Fragment>
            }
        </div>
    )
}