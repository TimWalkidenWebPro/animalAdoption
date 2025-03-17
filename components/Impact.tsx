'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {useEffect, useRef, useState} from "react";
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

const Impact= (params: Props) => {

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
     my-36 max-w-6xl xl:mx-auto mx-4 flex xl:justify-between xl:items-center xl:flex-row flex-col-reverse gap-12 xl:gap-0  transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:w-[55%]">
            {params.blok.ImpactStat.map((stat: stat, index: number ) => (
                <div className={`rounded-xl bg-foreground text-foregroundLightText bg-opacity-50 h-fit flex  transition-all duration-500 ease-out hover:-translate-y-4   ${index !== 1 ? 'xl:mt-12 flex-col' : 'flex-col-reverse'}`} key={index}>
                    <img width={190} height={126} className={`${index !== 1 ? 'rounded-t-xl' : 'rounded-b-xl'}`} src={stat.Image.filename} alt={stat.Image.alt} />
                    <div className="p-4">
                        <h3 className='text-center font-bold text-lg pb-2'>{stat.Heading}</h3>
                        <p className='text-center'>{stat.content}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="xl:w-1/3">
            <h2 className="font-bold text-4xl mb-4" dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? "" }}/>
            <p className="text-base">{params.blok.Content}</p>
        </div>
    </div>
}

export default Impact;