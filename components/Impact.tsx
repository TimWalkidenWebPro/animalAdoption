'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {motion} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {renderRichText} from "@/lib/utilsClient";

type Props = {
    blok: {
        Heading: object,
        Content: string,
        ImpactStat: stat[]
    }
}

type stat = {
    Heading: string,
    content: string,
    Image: {
        filename: string,
        alt: string
    }
}



const itemVariants =  {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ( { opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.5} })
}

const Impact= (params: Props) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return <div ref={ref} {...storyblokEditable(params.blok)}  className={`
     my-36 max-w-6xl xl:mx-auto mx-4 flex md:justify-between md:items-center xl:flex-row flex-col-reverse gap-12 xl:gap-0  transition-all duration-700 ease-out transform`}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:w-[55%]">
            {params.blok.ImpactStat.map((stat: stat, index: number ) => (
                <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={index + 1} variants={itemVariants} className={`rounded-xl bg-foreground text-foregroundLightText bg-opacity-50 h-fit flex  transition-all duration-500 ease-out hover:-translate-y-4   ${index !== 1 ? 'xl:mt-12 flex-col' : 'flex-col-reverse'}`} key={index}>
                    <img width={350} height={126} className={`${index !== 1 ? 'rounded-t-xl' : 'rounded-b-xl'} w-full`} src={stat.Image.filename} alt={stat.Image.alt} />
                    <div className="p-4">
                        <h3 className='text-center font-bold text-lg pb-2'>{stat.Heading}</h3>
                        <p className='text-center'>{stat.content}</p>
                    </div>
                </motion.div>
            ))}
        </div>
        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={0} variants={itemVariants} className="xl:w-1/3">
            <h2 className="font-bold text-4xl mb-4 text-center xl:text-left" dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? "" }}/>
            <p className="text-base text-center xl:text-left">{params.blok.Content}</p>
        </motion.div>
    </div>
}

export default Impact;