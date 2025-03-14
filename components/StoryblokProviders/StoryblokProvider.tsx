import {apiPlugin, storyblokInit} from "@storyblok/react/rsc";
import { PropsWithChildren } from "react";
import { Page } from "@/components/Page";
import { HeroButtons } from "@/components/HeroButtons";
import Impact from "@/components/Impact";
import OverlayImage from "../OverlayImage";
import Donations from "../Donations";
import Services from "../Services";
import PopularArticles from "@/components/PopularArticles";
import ReviewsHome from "@/components/ReviewsHome";
import FeaturedPets from "@/components/FeaturedPets";
import HeroBulletPoints from "@/components/HeroBulletPoints";
import ContentWithImageRight from "@/components/ContentWithImageRight";
import HeadingWithFourBoxes from "@/components/HeadingWithFourBoxes";
import ReviewsDesignTwo from "@/components/ReviewsDesignTwo";
import ContactPage from "@/components/ContactPage";
import FAQs from "@/components/Global/FAQs";
import AnimalSearch from "@/components/AnimalSearch";
import AnimalView from "@/components/AnimalView";
import BlogSearch from "@/components/BlogSearch";
import Article from "@/components/Article";
storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    components: {
        page: Page,
        HeroButtons: HeroButtons,
        Impact: Impact,
        OverlayImage:OverlayImage,
        Donations: Donations,
        Services: Services,
        PopularArticles: PopularArticles,
        ReviewsHome: ReviewsHome,
        FeaturedPets: FeaturedPets,
        HeroBulletPoints: HeroBulletPoints,
        ContentWithImageRight: ContentWithImageRight,
        HeadingWithFourBoxes: HeadingWithFourBoxes,
        ReviewsDesignTwo: ReviewsDesignTwo,
        contactPage: ContactPage,
        faqs: FAQs,
        animalSearch: AnimalSearch,
        AnimalView: AnimalView,
        BlogSearch: BlogSearch,
        Article: Article,
    },
    enableFallbackComponent: true,
});

export const StoryblokProvider = ({ children }: PropsWithChildren) => {
    return <>{children}</>;
};
