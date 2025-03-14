import { StoryblokStory } from "@storyblok/react/rsc";
import {permanentRedirect} from "next/navigation";
import {fetchPageContent, getStoriesByTags} from "@/lib/utils";

const page = async (props:any) => {
    const params = await props.params
    const story = await fetchPageContent(`animals/${params.type}`, ["animalSearch.Animals"]);
    if(story) {
        const animals  = await getStoriesByTags(story.content.Tags, 'animals/');
        return <StoryblokStory story={story} animals={animals} />
    } else {
        return permanentRedirect('/');
    }
};

export default page;
