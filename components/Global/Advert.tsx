import Link from "next/link";
type propsType ={
    advert: {
        heading: string,
        linkOneHref: {
            cached_url: string,
        }
        linkOneName: string
        linkTwoHref: {
            cached_url: string,
        }
        linkTwoName: string,
        image: {
            filename: string,
        }
    }
}
const Advert = (props: propsType) => {
    return (
        <div
            className='relative max-w-6xl xl:mx-auto mx-4 border-8 border-foreground rounded-3xl  mb-24 bg-top bg-no-repeat bg-cover content-center min-h-[300px]'
            style={{backgroundImage: `url('${props.advert.image.filename}')`}}>
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
            <div className='absolute inset-0 flex items-center justify-center flex-col'>
                <h2 className='font-bold text-2xl text-white text-center xl:text-left'>{props.advert.heading}</h2>
                <div className='flex sm:gap-24 gap-8 sm:flex-row flex-col pt-8'>
                    <Link href={props.advert.linkOneHref.cached_url}
                          className="text-foregroundLightText bg-foregroundLight px-8 flex h-[45px] justify-center items-center rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                        {props.advert.linkOneName}
                    </Link>
                    <Link href={props.advert.linkTwoHref.cached_url}
                          className="bg-foreground text-foregroundLightText  px-8 flex h-[45px] justify-center items-center rounded-xl transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                        {props.advert.linkTwoName}                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Advert;