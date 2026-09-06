"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/app/common/Magnetic"
import Nav from "./Nav";
import LanguageToggle from "../common/LanguageToggle";
import { useLang } from "@/i18n/LanguageProvider";



export default function Header() {
    const [isMobile, setIsMobile] = useState(false)
    const header = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [isActive, setIsActive] = useState(false)
    const { t, lang } = useLang();
    const headerValues = ["About", "Contact", "Work"] as const;
    const navLabels = { About: t.nav.about, Contact: t.nav.contact, Work: t.nav.work };
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [pathname]);

    const NavigatePages = (page: string) => {
        router.push(`/${page}`);
    };



    const handleToHomePage = () => {
        router.push("/")
    }
    return (
        <>
            <div
                ref={header}
                className={`top-0 z-10 flex w-full items-center justify-between gap-4 px-5 py-6 md:px-9 md:py-8 
    ${(pathname === "/" || pathname === "/Contact") ? "text-white" : "text-black"} ${pathname === "/Contact" ? "bg-[#292a2b] " : ""}
    font-serif`}
            >
                <Magnetic>
                    <div onClick={handleToHomePage} className="flex cursor-pointer items-center group ">
                        <p className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-[360deg]">
                            ©
                        </p>
                        <div className="relative ml-1 flex overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:pr-8">
                            <p className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full">
                                Code by
                            </p>
                            <p className="relative pl-[0.5em] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[65px]">
                                Oyunbat
                            </p>
                            <p className="absolute left-[120px] pl-[0.4em] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[65px]">
                                Batnasan
                            </p>
                        </div>
                    </div>
                </Magnetic>

                {isMobile ? <div className="flex items-center space-x-2">
                    <LanguageToggle />
                    {["Menu"].map((item, i) => (
                        <Magnetic key={i}>
                            <div
                                onClick={() => setIsActive(!isActive)}
                                className="relative flex cursor-pointer flex-col items-center px-4 py-2 group z-50"
                            >
                                <AnimatePresence mode="wait">
                                    {isActive ? "" : (
                                        <motion.span
                                            key={`menu-${lang}`}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className={`cursor-pointer ${(pathname === "/" || pathname === "/Contact") ? "text-white" : "text-black"
                                                }`}
                                        >
                                            {t.nav.menu}
                                        </motion.span>
                                    )}
                                </AnimatePresence>


                                <div className={`absolute top-[45px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 scale-0 rounded-full ${(pathname === "/" || pathname === "/Contact") ? "bg-white" : "bg-black"} transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`} />
                            </div>
                        </Magnetic>
                    ))}
                </div> : <div className="flex items-center space-x-6">
                    <LanguageToggle />
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={lang}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="flex items-center space-x-6"
                        >
                    {headerValues.map((item, i) => (
                        <Magnetic key={i}>
                            <div
                                onClick={() => NavigatePages(item)}
                                className="relative flex cursor-pointer flex-col items-center px-4 py-2 group z-30"
                            >
                                <a
                                    className={`cursor-pointer ${(pathname === "/" || pathname === "/Contact") ? "text-white" : "text-black"
                                        }`}
                                >
                                    {navLabels[item]}
                                </a>

                                <div className={`absolute top-[45px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 scale-0 rounded-full ${(pathname === "/" || pathname === "/Contact") ? "bg-white" : "bg-black"} transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`} />
                            </div>
                        </Magnetic>
                    ))}
                        </motion.div>
                    </AnimatePresence>
                </div>}
                <AnimatePresence mode="wait">{isActive && <Nav setIsActive={setIsActive} />}</AnimatePresence>
            </div>


        </>
    );
}
