import {renderRichText} from "@storyblok/react";
import {getStoryblokApi} from "@storyblok/react/rsc";


export const handleRichText = (text: any) => {
    return {
        __html: renderRichText(text)
    }
}

export async function getStoriesByTags(tags: string, startWith: string) {
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    const storyblokApi = getStoryblokApi();
    const {data} = await storyblokApi.get("cdn/stories", {version: version, with_tag: tags, starts_with: startWith,});
    return data.stories;
}

export async function fetchPageContent(slug: string, resolveRelations: string[]) {
    const client = getStoryblokApi();
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;

    try {
        const response = await client.get(`cdn/stories/${slug}`, { version: version, resolve_links: 'link',  resolve_relations: resolveRelations });
        return response.data.story;
    } catch (error) {
        console.log(error);
        return null;
    }
}

type configType = {
    version: "published" | "draft" | undefined,
    starts_with: string,
    per_page: number,
    page: number,
    with_tag?: string,
}

export async function getAllPosts(perPage: number, page: number, tagId?: string) {
    const client = getStoryblokApi();
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    const config: configType = {
        version: version,
        starts_with: 'posts/',
        per_page: perPage,
        page: page,
    }
    if (tagId) {
        config['with_tag'] = tagId;
    }
    try {
        const response = await client.get("cdn/stories", config );
        return response.data.stories;
    } catch (error) {
        console.log(error);
        return null;
    }
}

type categoryType = {name: string, full_slug: string}

export async function getPostCategories(notAllowedCategory: string) {
    const client = getStoryblokApi();
    const version = process.env.NEXT_PUBLIC_REACT_APP_STORYBLOK_ACCESS_ENV as "published" | "draft" | undefined;
    try {
        const response = await client.get("cdn/stories", {
            version: version,
            starts_with: 'blog/',
            per_page: 100,
            page: 1,
        });
        const categories: categoryType[] = response.data.stories
            .filter((story: categoryType) => story.full_slug !== notAllowedCategory && story.full_slug !== 'blog/')
            .map((c: categoryType) => ({
            name: c.name,
            slug: c.full_slug,
        }));
        return categories;
    } catch (error) {
        console.log(error);
        return null;
    }
}
