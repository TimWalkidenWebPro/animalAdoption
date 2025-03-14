import {storyblokEditable, StoryblokServerComponent} from "@storyblok/react/rsc";
import {getAdvert} from "@/lib/utilsClient";
import Advert from "@/components/Global/Advert";

export const Page = async (params: any) => {
    let advertData = null;
    if(params.blok.includeAdvert) {
        advertData = await getAdvert();
    }

    return (
        <main {...storyblokEditable(params.blok)}>
            {
                params.blok.body.map((blok: any) => (
                    <StoryblokServerComponent class blok={blok} key={blok._uid} />
                ))
            }
            {
                advertData && (
                    <Advert advert={advertData} />
                )
            }
        </main>
    );
};

export default Page;