'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {renderRichText} from "@/lib/utilsClient";
import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";


type Props = {
    blok: {
        Heading: object,
        Content: string,
        BoxContent: {Heading:string, Content:string}[],
    }
}

const itemVariants =  {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ( { opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.5} })
}


const Services= (params: Props) => {

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return <div {...storyblokEditable(params.blok)} ref={ref} className={`
    my-36 max-w-6xl xl:mx-auto mx-4  transition-all duration-700 ease-out transform`}>
        <motion.h2 initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="font-bold text-4xl mb-4  text-center"
            dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
        <motion.p initial='hidden' animate={inView ? 'show' : 'hidden'} custom={2} variants={itemVariants} className="text-base xl:w-1/2 mx-auto text-center">{params.blok.Content}</motion.p>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-16 ">
            {params.blok.BoxContent.map((box , index: number) => (
                <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={index + 2} variants={itemVariants}
                     key={index}
                     className={`border-8 border-foreground h-max rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-4 hover:text-foregroundLightText hover:bg-foreground ${index % 2 !== 0 ? 'xl:mt-20' : ''}`}>
                    <h3 className="font-bold text-lg mb-2">{box.Heading}</h3>
                    <p>{box.Content}</p>
                </motion.div>
            ))}
        </div>
    </div>
}

export default Services;