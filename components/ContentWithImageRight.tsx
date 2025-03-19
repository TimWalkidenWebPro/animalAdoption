'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {motion} from "framer-motion";
import {renderRichText} from "@/lib/utilsClient";
import {useInView} from "react-intersection-observer";
type Props = {
    blok: {
        Heading: object,
        Content: object,
        Image: {filename: string},
    }
}

const itemVariants =  {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ( { opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.5} })
}

const ContentWithImageRight= (params: Props) => {

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return <div {...storyblokEditable(params.blok)} ref={ref} className={`my-36 max-w-6xl xl:mx-auto mx-4 flex gap-12 xl:justify-between xl:items-center `}>
        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="xl:max-w-[32rem] flex flex-col justify-center">
            <h1 className="font-bold text-4xl mb-4 text-center xl:text-left"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
            <div className="text-base text-center xl:text-left" dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Content) ?? ""}}/>
        </motion.div>

        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={2} variants={itemVariants} className='hidden w-full xl:flex items-center justify-center'>
            <img src={params.blok.Image.filename} alt="" width='300' loading='lazy'/>
        </motion.div>
    </div>
}

export default ContentWithImageRight;