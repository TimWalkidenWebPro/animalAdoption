'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {useEffect, useRef, useState} from "react";
import {renderRichText} from "@/lib/utilsClient";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AnimalCard from "@/components/Global/AnimalCard";

type Props = {
    blok: {
        Heading: object,
        Content: string,
        ButtonOneName: string,
        ButtonTwoName: string,
        ButtonOneLink: {cached_url: string},
        ButtonTwoLink: {cached_url: string},
        Animals: animal[]
    }
}

type animal =  {
    content: {
        Name: string,
        Breed: string,
        Image: {
            filename: string,
        }
        Age: string,
        Gender: string,
        shortDescription: string
    },
    full_slug: string
}


const FeaturedPets= (params: Props) => {
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
    dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
        <p className="text-base text-center xl:w-1/2 mx-auto">{params.blok.Content}</p>
        <div className="xl:w-1/2 mx-auto flex justify-between mb-16 mt-6">
            <Link href={params.blok.ButtonOneLink.cached_url} className="bg-foregroundLight text-foregroundLightText px-8 flex h-[45px] content-center items-center w-max mx-auto rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                {params.blok.ButtonOneName}
            </Link>
            <Link href={params.blok.ButtonTwoLink.cached_url} className="border-foreground h-[45px] border-2  px-8 flex content-center items-center w-max mx-auto rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground hover:text-foregroundLightText">
                {params.blok.ButtonTwoName}
            </Link>
        </div>

        <Swiper
            loop={true}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}

            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
            }}
        >
            {
                params.blok.Animals.map((animal: animal | string, index: number) => {
                    if(typeof animal === 'string') {
                        return null;
                    }
                    return (
                        <SwiperSlide key={index} className='animalSlide'>
                            <AnimalCard animal={animal} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>

    </div>
}

export default FeaturedPets;