import {  StoryblokStory } from "@storyblok/react/rsc";
import {permanentRedirect} from "next/navigation";
import {fetchPageContent} from "@/lib/utils";
import {getPreData} from "@/lib/cache";

export async function generateMetadata(props: any) {
    const params = await props.params
    const story = await getPreData(`animals-${params.type}-${params.name}`,`animals/${params.type}/${params.name}`, ["animalSearch.Animals"])

    return {
        title: story.content.meta_title,
        description: story.content.meta_description,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}animals/${params.type}/${params.name}`,
        },
    }
}

const page = async (props:any) => {
    const params = await props.params
    const story = await getPreData(`animals-${params.type}-${params.name}`,`animals/${params.type}/${params.name}`, ["animalSearch.Animals"])
    if(story) {
        return <StoryblokStory story={story} />
    } else {
        return permanentRedirect('/');
    }
};

export default page;
