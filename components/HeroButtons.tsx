import {storyblokEditable} from "@storyblok/react/rsc";
import Link from "next/link";
import {handleRichText} from "@/lib/utils";
export const HeroButtons = (params: any) => {
    return (
        <section {...storyblokEditable(params.blok)} className="mb-36  mt-12 max-w-6xl xl:mx-auto mx-4 flex xl:justify-between xl:items-center">
            <div className="xl:max-w-[32rem]">
                <h1 className="font-bold text-4xl mb-4" dangerouslySetInnerHTML={{ __html: handleRichText(params.blok.Heading)?.__html ?? "" }} />
                <p className="text-base">{params.blok.Content}</p>
                <div className="flex mt-8 items-center gap-8">
                    <Link href={params.blok.ButtonOneHref.cached_url} className="bg-foregroundLight px-8 h-[45px] content-center  rounded-xl bg-opacity-50 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                        {params.blok.ButtonOne}
                    </Link>
                    <Link href={params.blok.ButtonTwoHref.cached_url} className="border-foreground h-[45px] border-2 content-center px-8  rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                        {params.blok.ButtonTwo}
                    </Link>
                </div>
            </div>
            <div className='hidden xl:block'>
                <img src={params.blok.Image.filename} alt="" width='500' />
            </div>
        </section>
    )
}