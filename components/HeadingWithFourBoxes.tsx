'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {useEffect, useRef, useState} from "react";
import {renderRichText} from "@/lib/utilsClient";

type Props = {
    blok: {
        Heading: object,
        Content: string,
        BoxContent: {Heading:string, Content:string}[],
    }
}


const Services= (params: Props) => {
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
        <h2 className="font-bold text-4xl mb-4 xl:text-center"
            dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
        <p className="text-base xl:text-center xl:w-1/2 mx-auto">{params.blok.Content}</p>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-16 ">
            {params.blok.BoxContent.map((box , index: number) => (
                <div key={index} className={`border-8 border-foreground h-max rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground ${index % 2 !== 0 ? 'xl:mt-20' : ''}`}>
                    <h3 className="font-bold text-lg mb-2">{box.Heading}</h3>
                    <p>{box.Content}</p>
                </div>
            ))}
        </div>
    </div>
}

export default Services;