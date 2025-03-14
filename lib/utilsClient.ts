import StoryblokClient from 'storyblok-js-client';

const storyblok = new StoryblokClient({
    accessToken: process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_TOKEN,
})

export function renderRichText(richTextContnet: any) {
    if (!richTextContnet) return '';
    return storyblok.richTextResolver.render(richTextContnet);
}

export async function getNavigation() {
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    const {data} = await storyblok.get("cdn/stories/navbar", {version: version, resolve_links: 'link'});
    return data.story.content;
}

export async function getFooter() {
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    const {data} = await storyblok.get("cdn/stories/footer", {version: version, resolve_links: 'link'});
    return data.story.content;
}

export async function getAdvert() {
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    const {data} = await storyblok.get("cdn/stories/advert", {version: version, resolve_links: 'link'});
    return data.story.content;
}

export async function getStoriesByTags(tags: string) {
    const {data} = await storyblok.get("cdn/stories", {version: 'draft', with_tag: tags});
    return data.stories;
}

export async function getAllPosts(perPage: number, page: number) {
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    const {data} = await storyblok.get("cdn/stories", {
        version: version,
        starts_with: 'posts/',
        per_page: perPage,
        page: page,
    });
    return data;
}