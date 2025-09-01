"use client"
import React, { useEffect, useState } from "react"
import { Ubuntu, Josefin_Sans } from "next/font/google";
import { useScroll, useTransform, motion, useInView } from 'framer-motion';
import AboutMeImage from "../../../public/about/profile-about.jpg"
import DesktopAboutMeImage from "../../../public/bg.png"
import AboutChildImage from "../../../public/about/child-about.jpeg"
import Footer from "../components/Footer";
import Globus from "../../../public/globus.gif"
import { ArrowDownRight } from "lucide-react"
import Image from "next/image";
import { useRef } from 'react';
const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});
const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});
const Page = () => {
    const [isTablet, setIsTablet] = useState(false);
    console.log(isTablet, "IS HEREE")
    const mainContainer = useRef(null);
    const container = useRef(null);
    const secondContainer = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setIsTablet(true)
            } else {
                setIsTablet(false)
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']

    })

    const y = useTransform(scrollYProgress, [0, 1], ["-20vh", "10vh"]);
    const { scrollYProgress: scrollYProgress2 } = useScroll({
        target: secondContainer,
        offset: ["start end", 'end start']
    })
    const y2 = useTransform(scrollYProgress2, [0, 1], ["-4vh", "10vh"]);

    const { scrollYProgress: scrollYProgress3 } = useScroll({
        target: mainContainer,
        offset: ["start end", 'end start']
    })
    const height = useTransform(scrollYProgress3, [0, 0.9], [50, 0])
    return (
        <div ref={mainContainer} >
            <div className=" flex flex-col z-10 relative pb-[20px] m-[0px_40px] sm:gap-[40px]">
                <div className=" mt-[60px] ml-[20px] md:text-[46px] lg:text-[66px] xl:text-[72px]  md:ml-[80px]">
                    <h1 className={`text-[42px] lg:text-[80px] ${ubuntu.className}`}>Transforming concepts into functional digital products.</h1>
                </div>
                <div className="h-[1px] bg-slate-400 m-[0px_20px] mt-[60px] relative">
                    <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full bg-[#455CE9] absolute -top-[50px] md:-top-[70px] -translate-x-1/4 right-1 overflow-visible ">
                        <div ><Image src={Globus} alt="globus" width={120} className="w-[140px]  object-contain"></Image></div></div>
                </div>
                {isTablet ? "" : <div className="flex flex-col gap-3 mt-[60px] mb-[20px]">
                    <ArrowDownRight className="ml-[20px]"></ArrowDownRight>
                    <p className={`ml-[20px] mr-[20px] font-mono ${josefinSans.className} `}>Collaboration is key to my process. I love turning big ideas into reality through teamwork and technical expertise.</p>
                </div>
                }
            </div>
            <div className=" flex flex-col bg-gray-100 pb-[200px] " ref={container} style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
                <div className="flex flex-col lg:flex-row">
                    {isTablet ? <div className="flex flex-col gap-3 mt-[60px] mb-[140px] ml-[40px] lg:ml-[100px] lg:pl-[100px] lg:mt-[100px]">
                        <ArrowDownRight className="ml-[20px]"></ArrowDownRight>
                        <p className={`ml-[20px] mr-[20px] font-mono lg:text-[20px] ${josefinSans.className} `}>Collaboration is key to my process. I love turning big ideas into reality through teamwork and technical expertise.</p>
                    </div> : ""}
                    <div className='relative left-0 h-[70vh] w-full sm:mt-[100px] lg:mt-[200px]'>
                        <motion.div style={{ y }} className='relative m-[0px_20px] sm:m-[0px_60px]  h-full lg:w-[500px] '>

                            <Image src={AboutMeImage} fill alt="image" className="lg:w-[800px]" style={{ objectFit: "cover" }} />

                        </motion.div>

                    </div>
                </div>
                <div className=" flex flex-col sm:m-[0px_40px] sm:mt-[120px] md:m-[0px_40px]">
                    <h2 className={`text-[36px] mt-[60px] ml-[20px] mb-[40px] lg:text-[56px] ${ubuntu.className}`}>I can help you with ...</h2>
                    {isTablet ? "" : <hr className="m-[0px_20px] text-gray-400 mb-[40px]" />}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px] ml-[20px]">
                        {isTablet ? <div className="h-[140px] flex flex-col gap-[40px] ">
                            <p className="text-gray-500">01</p>
                            <hr className=" text-gray-400 " />
                            <div> <h4 className={`text-[22px] mb-[10px] lg:text-[32px] ${ubuntu.className}`}>Frontend Engineering</h4>
                                <p className={` text-[18px] ${josefinSans.className}`}>Creating pixel-perfect, responsive interfaces with React, Next.js, and Tailwind.</p>
                            </div>
                        </div> : <div className="h-[140px] flex flex-col gap-[10px] ">
                            <h4 className={`text-[22px] mb-[10px] lg:text-[32px] ${ubuntu.className}`}>Frontend Engineering</h4>
                            <p className={` text-[18px] ${josefinSans.className}`}>Creating pixel-perfect, responsive interfaces with React, Next.js, and Tailwind.</p>
                        </div>}
                        {isTablet ? <div className="flex flex-col gap-[40px]">
                            <p className="text-gray-500">02</p>
                            <hr className="mr-[20px] text-gray-400 m-[0px_0px]" />
                            <div className="h-[140px] flex flex-col gap-[10px] ">
                                <h4 className={`text-[22px] mb-[10px] lg:text-[32px] ${ubuntu.className}`}>Backend Systems</h4>
                                <p className={` text-[18px] ${josefinSans.className}`}> Developing REST APIs, managing databases, and ensuring performance.</p>
                            </div></div> : <div>
                            <hr className="mr-[20px] text-gray-400 m-[40px_0px]" />
                            <div className="h-[140px] flex flex-col gap-[10px] ">
                                <h4 className={`text-[22px] mb-[10px] ${ubuntu.className}`}>Backend Systems</h4>
                                <p className={` text-[18px] ${josefinSans.className}`}> Developing REST APIs, managing databases, and ensuring performance.</p>
                            </div></div>}
                        {isTablet ? <div className="flex flex-col gap-[40px]">
                            <p className="text-gray-500">03</p>
                            <hr className="mr-[20px]  text-gray-400" />
                            <div className="h-[140px] flex flex-col gap-[10px] ">
                                <h4 className={`text-[22px] mb-[10px] lg:text-[32px] ${ubuntu.className}`}>Full Projects</h4>
                                <p className={` text-[18px] ${josefinSans.className}`}>From ideation to deployment, I deliver complete solutions.</p></div></div> : <div>
                            <hr className="mr-[20px] mb-[40px] text-gray-400" />
                            <div className="h-[140px] flex flex-col gap-[10px] ">
                                <h4 className={`text-[22px] mb-[10px] ${ubuntu.className}`}>Full Projects</h4>
                                <p className={` text-[18px] ${josefinSans.className}`}>From ideation to deployment, I deliver complete solutions.</p></div></div>}
                    </div>
                </div>
            </div>
            <div ref={secondContainer} className="m-[0px_40px] flex flex-col lg:flex-row items-center gap-[40px]">

                <div className="flex flex-col gap-[20px] lg:flex-1">
                    <h2 className={`text-[36px] mt-[20px] mb-[10px] lg:text-[56px] ${ubuntu.className}`}>
                        Always Learning
                    </h2>
                    <p className={`text-[18px] font-[400] ${josefinSans.className}`}>
                        Currently pursuing a Software Engineering degree while simultaneously advancing through
                        the Pinecone Coding Academy, gaining real-world project experience alongside formal education.
                        Dedicated to continuous growth and staying up to date with industry trends.
                    </p>
                </div>


                <div className="relative w-full h-[50vh] lg:flex-1">
                    <motion.div style={{ y: y2 }} className="relative m-[0px_20px] h-full">
                        <Image src={AboutChildImage} fill alt="child image" style={{ objectFit: "cover" }} />
                    </motion.div>
                </div>
            </div>

            <motion.div

                style={{ height }}
                className="bg-white relative mt-[100px] "
            >
                <div className="h-[1400%] w-[100%]  rounded-b-[50%] bg-white z-[10] absolute shadow-[0px_60px_50px_rgba(0,0,0,0.748)]"></div>
            </motion.div>
            <Footer />

        </div>
    )
}
export default Page