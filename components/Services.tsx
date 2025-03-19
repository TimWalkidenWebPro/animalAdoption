'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {renderRichText} from "@/lib/utilsClient";
import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";

type Props = {
    blok: {
        Heading: object,
        Content: string,
        Services: Service[],
        Image: {
            filename: string,
        }
    }
}

type Service = {
    Heading: string,
    Content: string,
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
        <motion.h2 initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="font-bold text-4xl mb-4 text-center"
            dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
        <motion.p initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="text-base text-center xl:w-1/2 mx-auto">{params.blok.Content}</motion.p>
        <div className="grid gap-12 serviceGrid mt-16 items-center ">
            {params.blok.Services.map((service: Service , index: number) => (
                <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={index + 2} variants={itemVariants}  key={index} className='serviceBox border-8 border-foreground rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground hover:text-foregroundLightText'>
                    <h3 className="font-bold text-lg mb-2 text-center">{service.Heading}</h3>
                    <p>{service.Content}</p>
                </motion.div>
            ))}
            <motion.img initial='hidden' animate={inView ? 'show' : 'hidden'} custom={6} variants={itemVariants} src={params.blok.Image.filename} width={400} height={100} alt='' className="serviceImage mx-auto hidden xl:block"/>
        </div>
    </div>
}

export default Services;