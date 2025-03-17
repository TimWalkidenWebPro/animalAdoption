import { StoryblokStory } from "@storyblok/react/rsc";
import {permanentRedirect} from "next/navigation";
import {getStoriesByTags} from "@/lib/utils";
import {getPreData} from "@/lib/cache";

export async function generateMetadata(props: any) {
    const params = await props.params
    const story = await getPreData(`animal-${params.type}`, `animals/${params.type}`, ["animalSearch.Animals"])

    return {
        title: story.content.meta_title,
        description: story.content.meta_description,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}animals/${params.type}`,
        },
    }
}

const page = async (props:any) => {
    const params = await props.params
    const story = await getPreData(`animal-${params.type}`, `animals/${params.type}`, ["animalSearch.Animals"])

    if(story) {
        const animals  = await getStoriesByTags(story.content.Tags, 'animals/');
        return <StoryblokStory story={story} animals={animals} />
    } else {
        return permanentRedirect('/');
    }
};

export default page;
