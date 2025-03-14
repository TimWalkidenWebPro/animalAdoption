'use client'

import {useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";

type Props = {
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

const AnimalCard = ({animal}: {animal: Props}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
            <div className="relative h-[22rem] w-72" onClick={() => setIsFlipped(!isFlipped)}>
                <motion.div className="w-full h-full relative"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}>

                    <div
                        className="absolute backface-hidden">
                        <div
                            className={`relative bg-center border-8 border-foreground rounded-3xl bg-no-repeat  bg-cover h-[22rem] w-72 content-center`}
                            style={{backgroundImage: `url('${animal.content.Image.filename}')`}}>
                            <div
                                className='bg-animalCardInfo rounded-3xl text-center min-w-48 mx-2 absolute bottom-0 left-1/2 transformCustom'>
                                <p className='font-bold'>{animal.content.Name}</p>
                                <p>{animal.content.Breed}</p>
                            </div>
                        </div>
                    </div>
                    {/* Back Side */}
                    <div
                        className="absolute w-full h-full "
                        style={{transform: "rotateY(180deg)", backfaceVisibility: "hidden"}}>
                        <div className='bg-basecolor p-6 rounded-3xl absolute h-[90%] w-[90%] top-2/4 left-1/2 transformCustom'>
                            <h3 className='font-bold text-lg text-center'>{animal.content.Name}</h3>
                            <p className='mt-2 text-center'>{animal.content.Breed}</p>
                            <div className="flex justify-between mt-4">
                                {
                                    animal.content.Age && (
                                        <div className='flex gap-4 items-center'>
                                        <span>
                                            <img src='/age.svg' alt='Age' height={30} width={30}
                                                 className='h-[30px]'/>
                                        </span>
                                            {animal.content.Age} years
                                        </div>
                                    )
                                }
                                {
                                    animal.content.Gender && (
                                        <div className="flex gap-4 items-center">
                                        <span>
                                            <img src='/breed.svg' alt='Age' height={30} width={30}
                                                 className='h-[30px]'/>
                                        </span>
                                            {animal.content.Gender}
                                        </div>
                                    )
                                }
                            </div>
                            <p className='text-sm my-4 min-h-[90px] overflow-hidden text-ellipsis max-h-[110px]'>
                                {animal.content.shortDescription}
                            </p>
                            <Link href={`/${animal.full_slug}`}
                                  className="bg-foreground text-foregroundLightText block text-center w-full py-2 content-center  rounded-xl ">
                                View {animal.content.Name}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
    )
}

export default AnimalCard;