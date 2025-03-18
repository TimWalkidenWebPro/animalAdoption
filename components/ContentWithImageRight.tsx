'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {useEffect, useRef, useState} from "react";
import {renderRichText} from "@/lib/utilsClient";
type Props = {
    blok: {
        Heading: object,
        Content: object,
        Image: {filename: string},
    }
}


const ContentWithImageRight= (params: Props) => {
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
    my-36 max-w-6xl xl:mx-auto mx-4 flex gap-12 xl:justify-between xl:items-cente transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

        <div className="xl:max-w-[32rem] flex flex-col justify-center">
            <h1 className="font-bold text-4xl mb-4 text-center xl:text-left"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
            <div className="text-base text-center xl:text-left" dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Content) ?? ""}}/>
        </div>

        <div className='hidden w-full xl:flex items-center justify-center'>
            <img src={params.blok.Image.filename} alt="" width='300' loading='lazy'/>
        </div>
    </div>
}

export default ContentWithImageRight;