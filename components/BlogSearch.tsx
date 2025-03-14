import {storyblokEditable} from "@storyblok/react/rsc";
import {renderRichText} from "@/lib/utilsClient";
import ArticlePreviewSearch from "@/components/Global/ArticlePreviewSearch";
import BlogSideBar from "@/components/Global/BlogSideBar";

type props = {
    articles: article[];
    categories: {slug: string, name: string}[];
    blok: {
        content: string,
        heading: string,
    }
}

type article = {
        full_slug: string,
        content: {
            image: {
                filename: string,
            },
            title: string,
            Author: string,
            Tag: string,
        },
        created_at: string,
}

const BlogSearch = (params:props) => {
    return (
        <section {...storyblokEditable(params.blok)} className="  my-8 xl:my-24  max-w-6xl xl:mx-auto mx-4">
            <h1 className="font-bold text-4xl mb-4 text-center"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.heading) ?? ""}}/>
            <p className="text-base text-center xl:w-1/2 xl:mb-36 mb-8 mx-auto"> {params.blok.content} </p>

            <div className="grid gird-cols-1 xl:grid-cols-3 gap-20 xl:mt-16 mt-8">
                <div className="xl:col-span-2 flex flex-col gap-8">
                    {params.articles.map((article, index) => (
                        <ArticlePreviewSearch index={index} article={article} />
                    ))}
                </div>
                <BlogSideBar categories={params.categories} latestArticles={[]} />
            </div>
        </section>
    )
}

export default BlogSearch;