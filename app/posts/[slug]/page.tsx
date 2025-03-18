import { StoryblokStory } from "@storyblok/react/rsc";
import {notFound, permanentRedirect} from "next/navigation";
import {fetchPageContent, getAllPosts, getPostCategories} from "@/lib/utils";
import {getPreData} from "@/lib/cache";

export async function generateMetadata(props: any) {
    const params = await props.params
    const story = await getPreData(`posts-${params.slug}}`, `posts/${params.slug}`, [])

    return {
        title: story.content.meta_title,
        description: story.content.meta_description,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}posts/${params.slug}`,
        },
    }
}


const page = async (props:any) => {
    const params = await props.params
    const story = await getPreData(`posts-${params.slug}}`, `posts/${params.slug}`, [])

    if(story) {
        const [articles, categories] = await Promise.all([
            getAllPosts(3, 1, story.content.categoryId),
            getPostCategories(``)
        ])
        return  <StoryblokStory story={story} createdAt={story.created_at} articles={articles} categories={categories}/>;

    } else {
       return <div>not found - {`posts/${params.slug}`}</div>
         //return permanentRedirect('/');
    }
};

export default page;
