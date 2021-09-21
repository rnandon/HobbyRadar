import { Fragment } from "react";
import { useSelector } from "react-redux";


export default function RelatedHobbyRecommendations() {
    let relatedHobbies = useSelector((state) => state.recommendations.value);
    if (relatedHobbies !== "") {
        relatedHobbies = relatedHobbies.payload.relatedHobbies;
    }
    console.log("Related Hobbies: ");
    if (relatedHobbies) {
        console.log(relatedHobbies);
    }

    return (
        <div>
            <h3>Try new things</h3>
            {relatedHobbies.length === 0 &&
                <Fragment>
                    <h4>Sorry, we can't find any good recommendations for you right now. Check back soon!</h4>
                </Fragment>
            }
            {relatedHobbies.length > 0 &&
                <Fragment>
                    {relatedHobbies.map((hobby) => {
                        return <h4>{hobby.hobbyName}</h4>
                    })}
                </Fragment>    
            }

        </div>
    )
}