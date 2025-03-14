import { StoryblokStory } from "@storyblok/react/rsc";
import {fetchPageContent} from "@/lib/utils";

const Home = async () => {
    const story = await fetchPageContent('/home', ["PopularArticles.articles", "ReviewsHome.Reviews", "FeaturedPets.Animals"]);
    return <StoryblokStory story={story} />;
};

export default Home;
