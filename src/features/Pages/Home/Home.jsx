import ConnectionRecommendations from "../../Elements/Recommendations/ConnectionRecommendations";
import PopularHobbies from "../../Elements/Recommendations/PopularHobbies";
import RelatedHobbyRecommendations from "../../Elements/Recommendations/RelatedHobbyRecommendations";
import LocallyPopularHobbies from "../../Elements/Recommendations/LocallyPopularHobbies";

export default function Home(props) {
    return (
        <div>
            <h1>This is the homepage</h1>
            <h2>There is much more to come, this is just a placeholder!</h2>
            <div className="row">
                <ConnectionRecommendations className="col" />
                <RelatedHobbyRecommendations className="col" />
                <PopularHobbies className="col" />
                <LocallyPopularHobbies className="col" />
            </div>
        </div>
    )
}