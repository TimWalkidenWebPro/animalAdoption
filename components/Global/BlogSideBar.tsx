import Link from "next/link";
import ArticlePreview from "@/components/Global/ArticlePreviewSearch";

type category = {slug: string, name: string}
type article = {
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

const BlogSideBar = ({categories, latestArticles} : {categories: category[], latestArticles: article[]}) => {
    return (
        <div className='mb-8 xl:mb-0'>
            <h2 className='text-2xl font-bold'>Categories</h2>
            <div className='flex flex-wrap gap-8 mt-4'>
                {
                    categories.map((category, index) => (
                        <Link href={`/${category.slug}`} key={index}
                              className="bg-foreground text-foregroundLightText font-bold  px-8 h-[45px] content-center  rounded-xl transition-all duration-500 ease-out hover:bg-foreground">
                            {category.name}
                        </Link>
                    ))
                }
            </div>

            {
                latestArticles && (
                    <>
                        <h2 className='text-2xl font-bold mt-8'>Latest Articles</h2>
                        <div className='flex flex-col gap-8 mt-4'>
                            {
                                latestArticles.map((article: article, index: number) => (
                                    <ArticlePreview key={index} article={article} index={index} />
                                ))
                            }
                        </div>
                    </>
                )
            }

            <h2 className='text-2xl font-bold mt-8'>Follow us</h2>
            <div className='flex gap-4 mt-4'>
                {
                    process.env.NEXT_PUBLIC_FACEBOOK && (
                        <a className='bg-foreground rounded-2xl p-[10px]' href={process.env.NEXT_PUBLIC_FACEBOOK}>
                            <img src={'/facebook.svg'} alt='facebook' width='32' height='32'/>
                        </a>
                    )
                }
                {
                    process.env.NEXT_PUBLIC_X_SOCIAL && (
                        <a className='bg-foreground rounded-2xl p-[10px]' href={process.env.NEXT_PUBLIC_FACEBOOK}>
                            <img src={'/x.svg'} alt='x' width='32' height='32'/>
                        </a>
                    )
                }
                {
                    process.env.NEXT_PUBLIC_INSTAGRAM && (
                        <a className='bg-foreground rounded-2xl p-[10px]' href={process.env.NEXT_PUBLIC_FACEBOOK}>
                            <img src={'/instagram.svg'} alt='instagram' width='32' height='32'/>
                        </a>
                    )
                }
            </div>
        </div>
    )
}

export default BlogSideBar;