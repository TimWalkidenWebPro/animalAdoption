import {handleRichText} from "@/lib/utils";
import Link from "next/link";

type Props = {
    blok: {
        Description: string;
        linkText: string;
        linkHref: {
            cached_url: string;
        };
        Image: {
            filename: string;
        };
        Name: string;
        Breed: string;
        Age: string;
        AnimalAttributes: {
            content: string;
            Heading: string;
            icon: {filename: string};
        }[]
    }
}

const AnimalView = (params: Props) => {
console.log(params);
    return (
        <div className='mt-16 max-w-6xl xl:mx-auto mx-4 mb-8'>
           <div className='xl:grid xl:grid-cols-2 flex flex-col gap-12 mb-28'>
               <div>
                   <h1 className="font-bold text-4xl mb-4">{params.blok.Name}</h1>
                   <div className="text-base"
                        dangerouslySetInnerHTML={{__html: handleRichText(params.blok.Description)?.__html ?? ""}}/>
                   <Link href={`/${params.blok.linkHref.cached_url}`} className="bg-foreground block w-max px-8 py-4 mt-8 h-[45px] content-center  rounded-xl bg-opacity-50 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                       {params.blok.linkText}
                   </Link>
               </div>
               <div>
                   <div className="flex xl:justify-end justify-center">
                       <img className='border-8 border-foreground rounded-3xl' src={params.blok.Image.filename} alt={params.blok.Name} width={200} height={150} />
                   </div>
               </div>
           </div>
            <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12'>

                {params.blok.AnimalAttributes.map((attribute, index: number) => (
                    <div key={index} className='flex gap-8 bg-foregroundLight py-2 px-4 rounded'>
                        <div className='flex items-center justify-center'>
                            <img src={attribute.icon.filename} alt={attribute.Heading} height={30}
                                 className='h-[30px]'/>
                        </div>
                        <div>
                            <h3 className='font-bold'>{attribute.Heading}</h3>
                            <p>{attribute.content}</p>
                        </div>
                    </div>
                ))}

                {
                    params.blok.Breed && (
                        <div className='flex gap-8 bg-foregroundLight py-2 px-4 rounded'>
                            <div className='flex items-center justify-center'>
                                <img src='/breed.svg' alt='Bread' height={30}
                                     className='h-[30px]'/>
                            </div>
                            <div>
                                <h3 className='font-bold'>Breed</h3>
                                <p>{params.blok.Breed}</p>
                            </div>
                        </div>
                    )
                }

                {
                    params.blok.Age && (
                        <div className='flex gap-8 bg-foregroundLight py-2 px-4 rounded'>
                            <div className='flex items-center justify-center'>
                                <img src='/age.svg' alt='Age' height={30}
                                     className='h-[30px]'/>
                            </div>
                            <div>
                                <h3 className='font-bold'>Age</h3>
                                <p>{params.blok.Age} years</p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default AnimalView;