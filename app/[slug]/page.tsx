import { StoryblokStory } from "@storyblok/react/rsc";
import {notFound, permanentRedirect} from "next/navigation";
import {fetchPageContent, getAllPosts, getPostCategories} from "@/lib/utils";


const page = async (props:any) => {
    console.log('hereSLugOne')
    const params = await props.params;
    const story = await fetchPageContent(params.slug, ["ReviewsDesignTwo.Reviews", "FeaturedPets.Animals"]);
    if(story) {
        if(story?.content?.component === 'BlogSearch') {
            const [articles, categories] = await Promise.all([
                getAllPosts(6, 1),
                getPostCategories(`${params.slug}`)
            ])
            return  <StoryblokStory story={story} articles={articles} categories={categories}/>;
        }
        return  <StoryblokStory story={story} />;
    } else {
         return permanentRedirect('/');
    }
};

export default page;
