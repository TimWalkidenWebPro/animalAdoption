import { StoryblokStory } from "@storyblok/react/rsc";
import {notFound, permanentRedirect} from "next/navigation";
import {fetchPageContent, getAllPosts, getPostCategories} from "@/lib/utils";
import {getPreData} from "@/lib/cache";

export async function generateMetadata(props: any) {
    const params = await props.params
    const story = await getPreData(`blog-${params.slug}`, `blog/${params.slug}`, [])

    return {
        title: story.content.meta_title,
        description: story.content.meta_description,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}blog/${params.slug}`,
        },
    }
}

const page = async (props:any) => {
    const params = await props.params
    const story = await getPreData(`blog-${params.slug}`, `blog/${params.slug}`, [])

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
