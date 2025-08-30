import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from "../js/anim"
import Link from "../components/Link"

const navItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Work",
        href: "Work",
    },
    {
        title: "About",
        href: "About",
    },
    {
        title: "Contact",
        href: "Contact",
    },

]

const Nav = ({ }: { setIsActive: any }) => {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    return (

        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className='h-screen bg-[rgb(41,41,41)] fixed right-0 top-0 text-white z-30'
        >

            <div className='box-border h-full p-[80px] flex flex-col justify-between'>

                <div onMouseLeave={() => { setSelectedIndicator(pathname) }} className='flex flex-col text-[56px] gap-[12px] mt-[10px]' >

                    <div className='text-[rgb(153,153,153)] border-b border-solid border-b-[rgb(153,153,153)] uppercase text-[11px] mb-[40px] pb-1' >
                        <p>Navigation</p>
                    </div>
                    {

                        navItems.map((data, index) => {

                            return (
                                <div key={index}>
                                    <Link
                                        data={{ ...data, index }} setSelectedIndicator={setSelectedIndicator} isActive={selectedIndicator == data.href}
                                    ></Link>
                                </div>
                            )

                        })

                    }
                </div>
                <div className='flex flex-col w-full  gap-[10px]' >
                    <div><p className='text-[rgb(153,153,153)] text-[11px]'>Socials</p></div>
                    <div className='flex w-full gap-[10px]'>
                        <a className="no-underline text-white font-[300] border-b border-transparent transition duration-300 ease-in-out hover:border-white">
                            Facebook
                        </a>
                        <a className="no-underline text-white font-[300] border-b border-transparent transition duration-300 ease-in-out hover:border-white">
                            Instagram
                        </a>
                        <a className="no-underline text-white font-[300] border-b border-transparent transition duration-300 ease-in-out hover:border-white">
                            Github
                        </a>
                        <a className="no-underline text-white font-[300] border-b border-transparent transition duration-300 ease-in-out hover:border-white">
                            LinkedIn
                        </a>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}
export default Nav
