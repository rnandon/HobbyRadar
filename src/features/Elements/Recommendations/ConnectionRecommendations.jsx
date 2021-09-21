import { Fragment } from "react";
import { useSelector } from "react-redux";


export default function ConnectionRecommendations() {
    let connectionRecommendations = useSelector((state) => state.recommendations.value);
    if (connectionRecommendations !== "") {
        connectionRecommendations = connectionRecommendations.payload.possibleConnections;
    }
    console.log("Connection recommendations: ");
    if (connectionRecommendations) {
        console.log(connectionRecommendations);
    }

    return (
        <div>
            <h3>Find new friends</h3>
            {connectionRecommendations.length === 0 &&
                <Fragment>
                    <h4>Sorry, there aren't any people in your area right now. Check back soon!</h4>
                </Fragment>
            }
            {connectionRecommendations.length > 0 &&
                <Fragment>
                    {connectionRecommendations.map((connection) => {
                        return <h4>{connection.firstName}</h4>
                    })}
                </Fragment>
            }
        </div>
    )
}