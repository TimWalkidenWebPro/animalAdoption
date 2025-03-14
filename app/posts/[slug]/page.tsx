import { StoryblokStory } from "@storyblok/react/rsc";
import {notFound, permanentRedirect} from "next/navigation";
import {fetchPageContent, getAllPosts, getPostCategories} from "@/lib/utils";


const page = async (props:any) => {
    const params = await props.params;
    const story = await fetchPageContent(`posts/${params.slug}`, []);
    if(story) {
        const [articles, categories] = await Promise.all([
            getAllPosts(3, 1, story.content.categoryId),
            getPostCategories(``)
        ])
        console.log(story)
        return  <StoryblokStory story={story} createdAt={story.created_at} articles={articles} categories={categories}/>;

    } else {
       return <div>not found - {`posts/${params.slug}`}</div>
         //return permanentRedirect('/');
    }
};

export default page;
