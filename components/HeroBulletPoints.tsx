import {storyblokEditable} from "@storyblok/react/rsc";
import {handleRichText} from "@/lib/utils";

type props = {
    blok: {
        Image: {
            filename: string
        }
        Content: string,
        Heading: string,
        bulletpointImage: {
            filename: string
        },
        BulletPoint: {
          Heading: string,
          Content: string,
        }[]
    }
}

const HeroBulletPoints = (params:props) => {
    return (
        <section {...storyblokEditable(params.blok)}
                 className="mb-36  mt-12 max-w-6xl xl:mx-auto mx-4 flex xl:justify-between xl:items-center">
            <div className='hidden xl:block'>
                <img src={params.blok.Image.filename} alt="" width='500'/>
            </div>
            <div className="xl:max-w-[32rem] w-full">
                <h1 className="font-bold text-4xl mb-4 text-center xl:text-left"
                    dangerouslySetInnerHTML={{__html: handleRichText(params.blok.Heading)?.__html ?? ""}}/>
                <p className="text-base text-center xl:text-left">{params.blok.Content}</p>
                <ul className="flex gap-4 flex-col mt-8">
                    {params.blok.BulletPoint.map((p, index: number) => {
                        return (
                            <li key={index} className="flex gap-8 justify-center">
                                <div className="flex items-center">
                                    <img src={params.blok.bulletpointImage.filename} className='max-w-[50px] h-[50px]' alt={p.Heading} width='100' height='100'/>
                                </div>
                                <div>
                                    <h2 className='font-bold mb-2'>{p.Heading}</h2>
                                    <p>{p.Content}</p>
                                </div>
                            </li>)
                    }) }

                </ul>
            </div>

        </section>
    )
}

export default HeroBulletPoints;