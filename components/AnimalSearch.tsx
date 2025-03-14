"use client"
import AnimalCard from "@/components/Global/AnimalCard";
import {useEffect, useState} from "react";
import {getStoriesByTags, renderRichText} from "@/lib/utilsClient";

type Props = {
    animals: Animal[];
    blok: {
        Heading: object,
        Content: string,
        Tags: string,
    }
}

type Animal = {
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

const AnimalSearch = (params: Props) => {
    console.log(params.animals)
    return (
        <div className='my-8 xl:my-24 max-w-6xl xl:mx-auto mx-4'>
            <h1 className="font-bold text-4xl mb-4 text-center"
                dangerouslySetInnerHTML={{__html: renderRichText(params.blok.Heading) ?? ""}}/>
            <p className="text-base text-center xl:w-1/2 mx-auto"> {params.blok.Content} </p>

            <div className="xl:mt-16 mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {
                    params.animals.map((item: Animal, index: number) => {
                        return (
                            <div className='flex justify-center' key={index}>
                                <AnimalCard key={index} animal={item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AnimalSearch;