import {handleRichText} from "@/lib/utils";
import Link from "next/link";

type params = {
    blok: {
        Heading: object,
        Content: object,
        Image: {
            filename: string
        },
        ButtonName: string,
        ButtonLink: {
            cached_url: string
        },
    }
}

const OverlayImage = (params: params) => {
    return <div className={`bg-top bg-no-repeat my-36  bg-cover min-h-[32rem] content-center`} style={{backgroundImage: `url('${params.blok.Image.filename}')`}} >
        <div className="max-w-6xl mx-auto my-10">
            <div className="bg-black bg-opacity-60 rounded-lg text-white sm:w-2/5 mx-4 xl:mx-0 p-6">
                <h2 className="font-bold text-2xl mb-4"
                    dangerouslySetInnerHTML={{__html: handleRichText(params.blok.Heading)?.__html ?? ""}}/>
                <div className="text-base" dangerouslySetInnerHTML={{__html: handleRichText(params.blok.Content)?.__html ?? ""}}/>
                <Link href={params.blok.ButtonLink.cached_url} className="bg-foreground px-8 mt-4 h-[45px] text-black content-center items-center flex w-max rounded-xl">
                    {params.blok.ButtonName}
                </Link>
            </div>
        </div>
    </div>
}

export default OverlayImage;