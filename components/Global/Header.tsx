import {getNavigation} from "@/lib/utilsClient";
import Navbar from "@/components/Global/Navbar";

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

const Header = async () => {
    const navbar: Props = await getNavigation();

    return <div className="max-w-6xl xl:mx-auto mx-4 flex  justify-between items-center pt-8">
            <a href='/'>
                <img src={navbar.Logo.filename} alt="Logo" width='250' height='35'/>
            </a>
        <Navbar navbar={navbar}/>
    </div>;

}

export default Header