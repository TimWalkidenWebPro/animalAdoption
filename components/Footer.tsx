import Link from "next/link";
import {getFooter} from "@/lib/utilsClient";

type Props = {
    Menu: {
        name: string;
        url: { cached_url: string };
    }[],
    copyRightText: string,
}

const Footer = async () => {
    const footerData: Props = await getFooter();
    return (
        <footer className=' bg-foreground text-white'>
            <div className='flex justify-between items-center max-w-6xl xl:mx-auto mx-4 py-4'>
                <div>
                    <ul className='flex gap-4 mb-4'>
                        {
                            footerData.Menu.map((item, index: number) => {
                                return (
                                    <li key={index}>
                                        <Link href={`/${item.url.cached_url}`}>{item.name}</Link>
                                    </li>
                                )
                            })
                        }

                    </ul>
                    <p>{footerData.copyRightText}</p>
                </div>
                <div className='flex gap-4'>
                    {
                        process.env.NEXT_PUBLIC_FACEBOOK && (
                            <a href={process.env.NEXT_PUBLIC_FACEBOOK}>
                                <img src={'/facebook.svg'} alt='facebook' width='32' height='32' />
                            </a>
                        )
                    }
                    {
                        process.env.NEXT_PUBLIC_X_SOCIAL && (
                            <a href={process.env.NEXT_PUBLIC_FACEBOOK}>
                                <img src={'/x.svg'} alt='x' width='32' height='32'/>
                            </a>
                        )
                    }
                    {
                        process.env.NEXT_PUBLIC_INSTAGRAM && (
                            <a href={process.env.NEXT_PUBLIC_FACEBOOK}>
                                <img src={'/instagram.svg'} alt='instagram' width='32' height='32'/>
                            </a>
                        )
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer;