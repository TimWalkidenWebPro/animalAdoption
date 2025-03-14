import {  StoryblokStory } from "@storyblok/react/rsc";
import {permanentRedirect} from "next/navigation";
import {fetchPageContent} from "@/lib/utils";

const page = async (props:any) => {
    const params = await props.params
    const story = await fetchPageContent(`animals/${params.type}/${params.name}`, ["animalSearch.Animals"]);
    if(story) {
        return <StoryblokStory story={story} />
    } else {
        return permanentRedirect('/');
    }
};

export default page;
