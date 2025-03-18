"use client"
import Link from "next/link";
import {RefObject, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
type Props = {
    navbar : {
        Menu: LinkType[],
        MainButton: LinkType[],
    }
}

type LinkType = {
    name: string,
    url: { cached_url: string }
}

const Navbar = ({navbar}: Props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
                setShowMenu(false);
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showMenu]);

    return (
        <>

            <div className="sm:hidden">
                <button onClick={() => {
                    setShowMenu(!showMenu);
                }}>
                    <img src={'/menu.svg'} width='20' height='20' alt='Menu'/>
                </button>
            </div>

            <nav
                className={`hidden sm:block`}>
                <ul className="flex flex-col sm:flex-row gap-8 sm:items-center p-4 xl:p-0  xl:text-black ">
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
                        <Link href={navbar.MainButton[0].url.cached_url}
                              className="bg-foregroundLight text-foregroundLightText px-8 flex h-[45px] content-center items-center rounded-xl bg-opacity-50 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                            {navbar.MainButton[0].name}
                        </Link>
                    </li>
                </ul>
            </nav>

            <AnimatePresence>
                {showMenu && (
                    <motion.nav
                        initial={{x: '-100%', opacity: 0}}
                        animate={{x: '0', opacity: 1}}
                        exit={{x: '-100%', opacity: 0}}
                        transition={{type: 'spring', stiffness: 100, damping: 15}}
                        className={`fixed sm:hidden left-0  top-0 h-screen z-10   bg-foreground  text-foregroundLightText`}>
                        <button className='flex justify-end w-full pr-4 pt-2' onClick={() => setShowMenu(!showMenu)}>x</button>
                        <ul className="flex flex-col xl:flex-row gap-8 xl:items-center p-4 xl:p-0  xl:text-black ">
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
                                <Link href={navbar.MainButton[0].url.cached_url}
                                      className="bg-foregroundLight text-foregroundLightText px-8 flex h-[45px] content-center items-center rounded-xl bg-opacity-50 transition-all duration-500 ease-out hover:-translate-y-4  hover:bg-foreground">
                                    {navbar.MainButton[0].name}
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )


}

export default Navbar;