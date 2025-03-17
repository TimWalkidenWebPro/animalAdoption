import { StoryblokStory } from "@storyblok/react/rsc";
import {fetchPageContent} from "@/lib/utils";
import {getPreData} from "@/lib/cache";

export async function generateMetadata() {
    const story = await getPreData('homePage', '/home', ["PopularArticles.articles", "ReviewsHome.Reviews", "FeaturedPets.Animals"])
    return {
        title: story.content.meta_title,
        description: story.content.meta_description,
        alternates: {
            canonical: process.env.NEXT_PUBLIC_APP_URL,
        },
    }
}
const Home = async () => {
    const story = await getPreData('homePage', '/home', ["PopularArticles.articles", "ReviewsHome.Reviews", "FeaturedPets.Animals"])
    return <StoryblokStory story={story} />;
};

export default Home;
