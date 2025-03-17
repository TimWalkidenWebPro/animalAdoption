import { StoryblokStory } from "@storyblok/react/rsc";
import { permanentRedirect} from "next/navigation";
import {getAllPosts, getPostCategories} from "@/lib/utils";
import {getPreData} from "@/lib/cache";

export async function generateMetadata(props:any) {
    const params = await props.params;
    const story = await getPreData(`page${params.slug}`, params.slug, ["ReviewsDesignTwo.Reviews", "FeaturedPets.Animals"])
    return {
        title: story.content.meta_title,
        description: story.content.meta_description,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}${params.slug}`,
        },
    }
}


const page = async (props:any) => {
    const params = await props.params;
    const story = await getPreData(`page${params.slug}`, params.slug, ["ReviewsDesignTwo.Reviews", "FeaturedPets.Animals"])

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
