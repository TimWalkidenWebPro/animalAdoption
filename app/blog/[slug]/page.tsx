import { StoryblokStory } from "@storyblok/react/rsc";
import {notFound, permanentRedirect} from "next/navigation";
import {fetchPageContent, getAllPosts, getPostCategories} from "@/lib/utils";


const page = async (props:any) => {
    const params = await props.params;
    const story = await fetchPageContent(`blog/${params.slug}`, []);
    if(story) {
        const [articles, categories] = await Promise.all([
            getAllPosts(6, 1, story.content.categoryId),
            getPostCategories(`blog/${params.slug}`)
        ])
        return  <StoryblokStory story={story} articles={articles} categories={categories}/>;

    } else {
         return permanentRedirect('/');
    }
};

export default page;
