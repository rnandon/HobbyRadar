import ConnectionRecommendations from "../../Elements/Recommendations/ConnectionRecommendations";
import PopularHobbies from "../../Elements/Recommendations/PopularHobbies";
import RelatedHobbyRecommendations from "../../Elements/Recommendations/RelatedHobbyRecommendations";
import LocallyPopularHobbies from "../../Elements/Recommendations/LocallyPopularHobbies";

export default function Home(props) {
    return (
        <div>
            <h1 className="text-center">Welcome to Hobby Radar!</h1>
            <h2 className="text-center">What would you like to explore today?</h2>

            <div className="accordion m-5 p-5" id="recommendations">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="connectionRecommendationsHeader">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#connectionRecommendations" aria-expanded="false" aria-controls="connectionRecommendations" >
                            Find new friends
                        </button>
                    </h2>
                    <div id="connectionRecommendations" className="accordion-collapse collapse " aria-labelledby="connectionRecommendationsHeader" data-bs-parent="#recommendations">
                        <div className="accordion-body">
                            <ConnectionRecommendations />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="relatedHobbyRecommendationsHeader">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#relatedHobbyRecommendations" aria-expanded="false" aria-controls="relatedHobbyRecommendations" >
                            Hobbies you may like
                        </button>
                    </h2>
                    <div id="relatedHobbyRecommendations" className="accordion-collapse collapse" aria-labelledby="relatedHobbyRecommendationsHeader" data-bs-parent="#recommendations">
                        <div className="accordion-body">
                            <RelatedHobbyRecommendations />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="popularHobbiesRecommendationsHeader">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#popularHobbiesRecommendations" aria-expanded="false" aria-controls="popularHobbiesRecommendations" >
                            Most popular hobbies
                        </button>
                    </h2>
                    <div id="popularHobbiesRecommendations" className="accordion-collapse collapse" aria-labelledby="popularHobbiesRecommendationsHeader" data-bs-parent="#recommendations">
                        <div className="accordion-body">
                            <PopularHobbies />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="localHobbiesRecommendationsHeader">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#localHobbiesRecommendations" aria-expanded="false" aria-controls="localHobbiesRecommendations" >
                            Hobbies popular in your area
                        </button>
                    </h2>
                    <div id="localHobbiesRecommendations" className="accordion-collapse collapse" aria-labelledby="localHobbiesRecommendationsHeader" data-bs-parent="#recommendations">
                        <div className="accordion-body">
                            <LocallyPopularHobbies />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}