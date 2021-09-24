import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function ConnectionRecommendations() {
    let connectionRecommendations = useSelector((state) => state.recommendations.value);
    try {
        if (connectionRecommendations.payload.possibleConnections) {
            connectionRecommendations = connectionRecommendations.payload.possibleConnections;
        }
    } catch {
        connectionRecommendations = [];
    }

    return (
        <div className="col">
            <h2>Find new friends</h2>
            {connectionRecommendations.length === 0 &&
                <Fragment>
                    <h4>Sorry, there aren't any people in your area right now. Check back soon!</h4>
                </Fragment>
            }
            {connectionRecommendations.length > 0 &&
                <Fragment>
                    <ol className="list-group list-group-numbered">
                        {connectionRecommendations.map((connection) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <Link to={`/people/${connection.username}`} className="ms-2 me-auto">
                                        <div className="fw-bold">{connection.firstName} {connection.lastInitial}</div>
                                    </Link>
                                    <span className="badge bg-primary rounded-pill">{connection.rating}</span>
                                </li>
                            )
                        })}
                    </ol>
                </Fragment>
            }
        </div>
    )
}