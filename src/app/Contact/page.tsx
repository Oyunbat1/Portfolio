"use client";
import Image from "next/image";
import GetInRounded from "../common/RoundedButton";
import { useRef, useState, useEffect } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { Josefin_Sans } from "next/font/google";
import AboutMeImage from "../../../public/mobile/profile.jpg"
import Form from "./components/Form";
import Social from "./components/Social";
import SocialAccount from "./components/SocialAccount";
import SocialContact from "./components/SocialContact";

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});

export default function Contact() {
    const container = useRef(null);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth <= 764);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"],
    });
    const x = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

    return (
        <>
            {isTablet ? (
                <motion.div
                    style={{ y }}
                    ref={container}
                    className="text-white flex flex-col gap-6 items-center bg-[#292a2b] relative h-auto"
                >
                    <div className="flex flex-col mt-[50px] w-full justify-center items-center relative">
                        <motion.svg
                            style={{ rotate, scale: 2 }}
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute -top-6 right-10"
                        >
                            <path
                                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                                fill="white"
                            />
                        </motion.svg>
                        <span className={`flex items-center gap-2 ${josefinSans.className} text-[36px]`}>
                            <Image
                                alt="image"
                                src={AboutMeImage}
                                width={80}
                                height={80}
                                className="object-cover w-[50px] h-[50px] rounded-full"
                            />
                            Одооноос
                        </span>
                        <span className={`flex ${josefinSans.className} text-[36px]`}>
                            хамтарч ажиллацгаая.
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-4 items-start pl-[20px]">
                        <div className="flex flex-col gap-2">
                            <h3 className={`text-gray-400 font-light text-base`}>Холбогдох мэдээлэл</h3>
                            <div>
                                <p>oyunbat9958@gmail.com</p>
                                <p>+976 80661615</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className={`text-gray-400 font-light text-base`}>Байршил</h3>
                            <p>Ulaanbaatar,Mongolia</p>
                        </div>
                    </div>

                    <Form isTablet={isTablet} />


                    <div className="w-full flex justify-center">
                        <div className="flex-col items-center mb-[30px]">
                            <Social isTablet={isTablet} />
                            <SocialAccount isTablet={isTablet} />
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    style={{ y }}
                    ref={container}
                    className="text-white flex flex-col gap-6 items-center bg-[#292a2b] relative h-auto"
                >
                    <div className="w-full flex justify-around mt-[40px]">
                        <div className="flex flex-col gap-10">
                            <span className={`flex items-center gap-2 w-[400px] ${josefinSans.className} text-[46px] lg:text-[66px] lg:w-[560px]`}>
                                Одооноос  хамтарч ажиллацгаая.
                            </span>
                            <Form isTablet={isTablet} />
                        </div>

                        <div className="flex flex-col gap-10">
                            <Image
                                alt="image"
                                src={AboutMeImage}
                                width={80}
                                height={80}
                                className="object-cover w-[100px] h-[100px] rounded-full"
                            />
                            <motion.svg
                                style={{ rotate, scale: 2 }}
                                width="9"
                                height="9"
                                viewBox="0 0 9 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                                    fill="white"
                                />
                            </motion.svg>

                            <div className="w-full flex flex-col gap-4 items-start pl-[20px]">
                                <div className="flex flex-col gap-2">
                                    <h3 className={`text-gray-400 font-light text-base`}>Холбогдох мэдээлэл</h3>
                                    <div className="flex flex-col gap-2 lg:gap-6">
                                        <p>oyunbat9958@gmail.com</p>
                                        <p>+976 80661615</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className={`text-gray-400 font-light text-base`}>Байршил</h3>
                                    <p>Ulaanbaatar,Mongolia</p>
                                </div>
                                <Social isTablet={isTablet} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex w-full justify-around mb-[30px]">
                            <SocialContact isTablet={isTablet} />
                            <SocialAccount isTablet={isTablet} />
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}
