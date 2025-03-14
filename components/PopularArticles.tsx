'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {useEffect, useRef, useState} from "react";
import {renderRichText} from "@/lib/utilsClient";
import Link from "next/link";
import ArticlePreview from "@/components/Global/ArticlePreview";

type Props = {
    blok: {
        heading: object,
        content: string,
        buttonLink: {url: string},
        buttonName: string
        articles: articleType[]
    }
}

type articleType = {
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


const PopularArticles= (params: Props) => {
    const [isVisible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setVisible(true)
                }
            },
            {threshold: 0.1}
        )

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    })

    return <div {...storyblokEditable(params.blok)} ref={ref} className={`
    my-36 max-w-6xl xl:mx-auto mx-4  transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h2 className="font-bold text-4xl mb-4 text-center"
            dangerouslySetInnerHTML={{__html: renderRichText(params.blok.heading) ?? ""}}/>
        <p className="text-base text-center xl:w-1/2 mx-auto">{params.blok.content}</p>
        <Link href={params.blok.buttonLink.url} className="bg-foregroundLight mt-8 px-8 flex h-[45px] content-center items-center w-max mx-auto rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
            {params.blok.buttonName}
        </Link>
        <div className="grid xl:grid-cols-4 grid-cols-1 gap-6 mt-8">
            {
                params.blok.articles.map((article: articleType, index: number) => {

                  return (
                      <ArticlePreview key={index} article={article} index={index} />
                  )
                })
            }
        </div>
    </div>
}

export default PopularArticles;