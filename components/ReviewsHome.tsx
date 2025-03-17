'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {useEffect, useRef, useState} from "react";
import {renderRichText} from "@/lib/utilsClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
type Props = {
    blok: {
        Heading: object,
        Content: string,
        Image: {
            filename: string,
        },
        Reviews: reviewType[]

    }
}

type reviewType = {
    content: {
        Review: string,
        Author: string,
    }
}


const ReviewsHome= (params: Props) => {
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
    my-36 max-w-6xl xl:mx-auto mx-4  transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} flex xl:flex-row flex-col gap-12 xl:justify-between xl:items-center`}>
        <div className="xl:max-w-[32rem]">
            <h2 className="font-bold text-4xl mb-4 r"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
            <p className="text-base mb-6">{params.blok.Content}</p>
            <Swiper
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
            >
                {
                    params.blok.Reviews.map((review: reviewType, index: number) => (
                        <SwiperSlide key={index} className='border-8 border-foreground rounded-3xl p-4'>
                            <p className='text-base'>{review.content.Review}</p>
                            <p className='font-bold text-base mt-4'>{review.content.Author}</p>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
        <div>
            <img src={params.blok.Image.filename} alt="Reviews" width='500' height={342} loading='lazy'/>
        </div>

    </div>
}

export default ReviewsHome;