"use client"
import React, { useEffect, useState } from "react"
import { Ubuntu, Josefin_Sans } from "next/font/google";
import { useScroll, useTransform, motion, useInView } from 'framer-motion';
import Rounded from "../common/MorePartreon";
// import AboutMeImage from "../../../public/about/profile-about.jpg"
// import DesktopAboutMeImage from "../../../public/bg.png"
// import AboutChildImage from "../../../public/about/child-about.jpeg"
import Courses from "@/constants/course";
import Footer from "../components/Footer";
import Globus from "../../../public/globus.gif"
import Card from "./component/Card";
// import { ArrowDownRight } from "lucide-react"
import Image from "next/image";
import { useRef } from 'react';
const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});
// const josefinSans = Josefin_Sans({
//     subsets: ["latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
//     style: ["normal", "italic"]
// });
const Page = () => {
    const [isTablet, setIsTablet] = useState(false);
    const mainContainer = useRef(null);
    const container = useRef(null)


    const { scrollYProgress: scrollYProgress } = useScroll({
        target: mainContainer,
        offset: ["start end", 'end start']
    })
    const { scrollYProgress: scrollYProgress2 } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])
    return (
        <div ref={mainContainer} >
            <div className=" flex flex-col z-10 relative pb-[20px] sm:gap-[40px]">
                <div className=" mt-[60px] ml-[20px] md:text-[26px] lg:text-[66px] xl:text-[72px]  md:ml-[80px]">
                    <h1 className={`text-[26px] lg:text-[52px] ${ubuntu.className}`}>Техник технологи хөгжиж байгаа энэ цаг үед гар утас , интернет байхад өөрийн ажлын бүтээмжээ ихэсгэх 100% боломжтой болсон.</h1>
                </div>
                <div className="h-[1px] bg-slate-400 m-[0px_20px] mt-[60px] relative">
                    <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full bg-[#455CE9] absolute -top-[50px] md:-top-[70px] -translate-x-1/4 right-1 overflow-visible ">
                        <div ><Image src={Globus} alt="globus" width={120} className="w-[140px]  object-contain"></Image></div></div>
                </div>

            </div>
            <div ref={container} className=" flex flex-col   ">
                {Courses.map((items, index) => {
                    const targetScale = 1 - ((Courses.length - index) * 0.05)
                    return < Card {...items} i={index} progress={scrollYProgress} range={[index * 0.25, 1]} targetScale={targetScale} />
                })}
            </div>
            <div className="px-6 md:px-20 lg:px-40 py-16 bg-gradient-to-b from-white to-gray-50 text-gray-800">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
                        Энэхүү <span className="text-blue-600">Community</span>-д та хэрхэн элсэх вэ?
                    </h1>

                    <div className="space-y-6 text-left sm:text-lg leading-relaxed">
                        <p>
                            <span className="font-semibold text-blue-600">1.</span> Та доорх
                            вебсайт-д бүртгэлээ үүсгэнэ.
                        </p>
                        <p>
                            <span className="font-semibold text-blue-600">2.</span> Миний оруулж буй
                            мэдээллүүдийг цаг алдалгүй үзэх болон{" "}
                            <span className="font-medium">public чатанд</span> асуух гэсэн зүйлсээ
                            асууж болно.
                        </p>
                        <p>
                            <span className="font-semibold text-blue-600">3.</span> Subscription авсан
                            хүмүүс миний оруулж байгаа{" "}
                            <span className="font-medium">хичээлүүдийг үнэ төлбөргүй</span> үзэх
                            боломжтой.
                        </p>
                        <p>
                            <span className="font-semibold text-blue-600">4.</span> Private групп-т илүү
                            нарийн зүйлсийг хуваалцах болно.
                        </p>
                    </div>

                    <div className="pt-8">
                        <p className="text-gray-600 mb-4">Доорх вебсайт-тай танилцаарай:</p>
                        <div className="flex justify-center">
                            <a
                                href="https://www.patreon.com/cw/OyunbatDev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Rounded>Patreon → OyunbatDev</Rounded>
                            </a>
                        </div>


                    </div>
                </div>
            </div>

            <motion.div

                style={{ height }}
                className="bg-white relative mt-[10px] "
            >
                <div className="h-[1400%] w-[100%]  rounded-b-[50%] bg-white z-[10] absolute shadow-[0px_60px_50px_rgba(0,0,0,0.748)]"></div>
            </motion.div>
            <Footer />

        </div>
    )
}
export default Page