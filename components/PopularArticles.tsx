'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {motion} from "framer-motion";
import {renderRichText} from "@/lib/utilsClient";
import Link from "next/link";
import ArticlePreview from "@/components/Global/ArticlePreview";
import {useInView} from "react-intersection-observer";

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

const itemVariants =  {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ( { opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.5} })
}

const PopularArticles= (params: Props) => {

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return <div {...storyblokEditable(params.blok)} ref={ref} className={`
    my-36 max-w-6xl xl:mx-auto mx-4`}>
        <motion.h2 initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="font-bold text-4xl mb-4 text-center"
            dangerouslySetInnerHTML={{__html: renderRichText(params.blok.heading) ?? ""}}/>
        <motion.p initial='hidden' animate={inView ? 'show' : 'hidden'} custom={2} variants={itemVariants} className="text-base text-center xl:w-1/2 mx-auto">{params.blok.content}</motion.p>
        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={3} variants={itemVariants}>
            <Link  href={params.blok.buttonLink.url} className="bg-foregroundLight text-foregroundLightText mt-8 px-8 flex h-[45px] content-center items-center w-max mx-auto rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                {params.blok.buttonName}
            </Link>
        </motion.div>
        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={4} variants={itemVariants} className="grid xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {
                params.blok.articles.map((article: articleType, index: number) => {

                  return (
                      <ArticlePreview key={index} article={article} index={index} />
                  )
                })
            }
        </motion.div>
    </div>
}

export default PopularArticles;