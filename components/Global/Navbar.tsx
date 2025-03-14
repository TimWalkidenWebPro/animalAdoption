import {getNavigation} from "@/lib/utilsClient";
import Link from "next/link";

type Props = {
    Logo: {
        filename: string;
    },
    Menu: LinkType[],
    MainButton: LinkType[],
}

type LinkType = {
    name: string,
    url: { cached_url: string }
}

const Navbar = async () => {
    const navbar: Props = await getNavigation()

    return <div className="max-w-6xl xl:mx-auto mx-4 flex justify-between items-center pt-8">
        <a href='/'>
            <img src={navbar.Logo.filename} alt="Logo" width='250' height='35' />
        </a>
        <nav>
            <ul className="flex gap-8 items-center">
                {
                    navbar.Menu.map((item: LinkType, index: number) => {
                        return (
                            <li key={index}>
                                <Link href={item.url.cached_url}>{item.name}</Link>
                            </li>
                        )
                    })
                }

                <li>
                    <Link href={navbar.MainButton[0].url.cached_url} className="bg-foregroundLight px-8 flex h-[45px] content-center items-center rounded-xl bg-opacity-50 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                        {navbar.MainButton[0].name}
                    </Link>
                </li>

            </ul>
        </nav>
    </div>;
}

export default Navbar;