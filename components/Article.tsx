import {storyblokEditable} from "@storyblok/react/rsc";
import BlogSideBar from "@/components/Global/BlogSideBar";
import {renderRichText} from "@/lib/utilsClient";
type Props = {
    blok:article ,
    createdAt: Date,
    categories: {slug: string, name: string}[];
    articles: latestArticle[]
}

type latestArticle ={
    full_slug: string;
    content: {
        image: {
            filename: string;
        };
        title: string;
        Author: string;
        Tag: string;
    };
    created_at: string;
}

type article = {
    title: string,
    Author: string,
    image: {filename: string},
    Tag: string,
    content: string,
}

const Article = (params: Props) => {
    const date = new Date(params.createdAt);
    const formattedDate = date.toLocaleDateString("en-GB").slice(0, 8);

    return (
        <section {...storyblokEditable(params.blok)} className=" xl:my-24  max-w-6xl xl:mx-auto mx-4">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-20 xl:mt-16 mt-8">
                <div className="xl:col-span-2 ">
                    <h1 className="font-bold text-3xl mb-3">{params.blok.title}</h1>
                    <div className="flex justify-between mb-8">
                        <p className="text-base">
                            By <span className='text-foreground font-bold'>{params.blok.Author}</span>
                        </p>
                        <p className="text-base">
                            {formattedDate}
                        </p>
                    </div>

                    <div className='w-full mb-8 relative'>
                        <img src={params.blok.image.filename} width="400" alt={params.blok.title} height="400" className="w-full h-[400px] rounded-xl object-cover" />
                        <div className='absolute right-1.5 top-1.5 rounded-xl text-sm z-10 bg-foreground w-24 p-1 text-center text-white font-bold'>
                            {params.blok.Tag}
                        </div>
                    </div>
                <div className='articleBody' dangerouslySetInnerHTML={{__html: renderRichText(params.blok.content) ?? ""}} />
                </div>
                <BlogSideBar categories={params.categories} latestArticles={params.articles}/>
            </div>
        </section>
    )
}

export default Article;
