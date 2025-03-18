
type props = {
    index: number,
    article: {
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
}

const ArticlePreviewSearch = ({index, article}: props) => {
    const date = new Date(article.created_at);
    const formattedDate = date.toLocaleDateString("en-GB").slice(0, 8);

    return (
        <a key={index} href={`/${article.full_slug}`} className='transition-all duration-500 ease-out hover:-translate-y-4'>
            <div className='border-8 border-foreground rounded-3xl previewArticleSearch'>
                <div className='previewImage relative'>
                    <div className='block absolute object-cover top-0 left-0 right-0 bottom-0 overflow-hidden'>
                        <div className='absolute right-1.5 top-1.5 rounded-xl text-sm z-10 bg-foreground w-24 p-1 text-center text-white font-bold'>{article.content.Tag}</div>
                        <img
                            className='rounded-l-2xl absolute object-cover top-0 left-0 right-0 bottom-0 overflow-hidden w-0 h-0 max-h-full max-w-full min-h-full min-w-full'
                            width={254} height={170}
                            src={article.content.image.filename} alt={article.content.title}/>
                    </div>
                </div>
                <div className='previewContent px-3 py-4 flex flex-col justify-center'>
                    <h3 className='font-bold mb-4 overflow-hidden text-ellipsis max-h-[72px] '>{article.content.title}</h3>
                    <span className='text-foreground font-bold'>{article.content.Author}</span>
                    <span className='font-bold'>{formattedDate}</span>
                </div>
            </div>
        </a>
    )
}

export default ArticlePreviewSearch