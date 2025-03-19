'use client'
import {storyblokEditable} from "@storyblok/react/rsc";
import {motion} from "framer-motion";
import {renderRichText} from "@/lib/utilsClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {useInView} from "react-intersection-observer";
type Props = {
    blok: {
        Heading: object,
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
    my-36 max-w-6xl xl:mx-auto mx-4  transition-all duration-700 ease-out transform `}>
            <motion.h2 initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants}
                       className="font-bold text-4xl mb-12 text-center"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
            <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={2} variants={itemVariants}>
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
                        params.blok.Reviews.map((review: reviewType, index: number) => (
                            <SwiperSlide key={index} className='text-center'>
                                <p className='text-base'>{review.content.Review}</p>
                                <p className='font-bold text-base mt-4'>{review.content.Author}</p>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </motion.div>
    </div>
}

export default ReviewsHome;