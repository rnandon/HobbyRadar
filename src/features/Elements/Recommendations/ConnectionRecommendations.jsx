import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Recommendations.css';


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
            {connectionRecommendations.length === 0 &&
                <Fragment>
                    <h4>Sorry, there aren't any people in your area right now. Check back soon!</h4>
                </Fragment>
            }
            {connectionRecommendations.length > 0 &&
                <Fragment>
                    <ol className="list-group">
                        {connectionRecommendations.map((connection) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <Link to={`/people/${connection.username}`} className="ms-2 me-auto fw-bold">
                                        <span>{connection.firstName} {connection.lastInitial}</span><span className="badge bg-blue rounded-pill mx-3">Common Hobbies: {connection.rating}</span>
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