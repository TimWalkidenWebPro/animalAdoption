'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {renderRichText} from "@/lib/utilsClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";

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

const itemVariants =  {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ( { opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.5} })
}

const ReviewsHome= (params: Props) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return <div {...storyblokEditable(params.blok)} ref={ref} className={`
    my-36 max-w-6xl xl:mx-auto mx-4  transition-all duration-700 ease-out transform  flex xl:flex-row flex-col gap-12 xl:justify-between xl:items-center`}>
        <div className="xl:max-w-[32rem]">
            <motion.h2 initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="font-bold text-4xl mb-4 text-center xl:text-left"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
            <motion.p initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className="text-base mb-6 text-center xl:text-left">{params.blok.Content}</motion.p>
            <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={3} variants={itemVariants}>
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
            </motion.div>
        </div>
        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={2} variants={itemVariants}>
            <img className='hidden xl:block' src={params.blok.Image.filename} alt="Reviews" width='500' height={342} loading='lazy'/>
        </motion.div>

    </div>
}

export default ReviewsHome;