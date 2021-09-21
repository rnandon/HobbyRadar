import ConnectionRecommendations from "../../Elements/Recommendations/ConnectionRecommendations";
import PopularHobbies from "../../Elements/Recommendations/PopularHobbies";
import RelatedHobbyRecommendations from "../../Elements/Recommendations/RelatedHobbyRecommendations";

export default function Home(props) {
    return (
        <div>
            <h1>This is the homepage</h1>
            <h2>There is much more to come, this is just a placeholder!</h2>
            <ConnectionRecommendations />
            <RelatedHobbyRecommendations />
            <PopularHobbies />
        </div>
    )
}