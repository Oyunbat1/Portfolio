"use client";
import Image from "next/image";
import Rounded from "../common/ContactButton";
import GetInRounded from "../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "../common/Magnetic";
import { useRouter } from "next/navigation";
import AboutMeImage from "../../../public/mobile/profile.jpg"
import Link from "next/link";
export default function Footer() {
    const container = useRef(null);
    const router = useRouter();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"],
    });
    const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

    return (
        <motion.div
            style={{ y }}
            ref={container}
            className="text-white flex flex-col items-center justify-center bg-[#292a2b] relative "
        >

            <div className="mt-[180px] w-full max-w-[1800px] bg-[#292a2b]">

                <div className="relative border-b border-[#868686] pb-[60px] md:pb-[30px] mx-6 sm:mx-12 md:mx-[200px] ">
                    <span className="flex items-center">
                        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] relative rounded-full overflow-hidden">
                            <Image
                                fill={true}
                                alt="image"
                                src={AboutMeImage}
                                className="object-cover"
                            />
                        </div>
                        <h2 className="ml-2 text-[8vw] md:text-[5vw] font-light">Одооноос хамтарч</h2>
                    </span>

                    <h2 className="text-[8vw] md:text-[5vw] font-light m-0">ажилцгаая</h2>

                    <motion.div
                        onClick={() => router.push('/Contact')}
                        style={{ x }}
                        className="absolute left-1/2  md:left-[calc(100%-400px)] top-[calc(100%-60px)] md:top-[calc(100%-75px)] -translate-x-1/2 md:translate-x-0"
                    >
                        <GetInRounded
                            backgroundColor={"#2563EB"}
                        >
                            <p className="m-0 text-[14px] md:text-base font-light z-20 relative">
                                Энд дараарай
                            </p>
                        </GetInRounded>
                    </motion.div>


                    <motion.svg
                        style={{ rotate, scale: 2 }}
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1/3 left-full"
                    >
                        <path
                            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                            fill="white"
                        />
                    </motion.svg>
                </div>

                <div className="flex flex-col sm:flex-row gap-2   mt-[70px] md:mt-[40px] mx-6 sm:mx-12 md:mx-[200px]">
                    <Rounded>
                        <p className="text-sm md:text-base">oyunbat9958@gmail.com</p>
                    </Rounded>
                    <Rounded>
                        <p className="text-sm md:text-base">+976 80661615</p>
                    </Rounded>
                </div>


                <div className="flex flex-col md:flex-row justify-between  mt-[30px] mb-[50px] md:mt-[80px] px-6 sm:px-12 md:px-20">

                    <div className="flex flex-row sm:flex-row  gap-6 sm:gap-10 mb-[40px]">
                        <span className="flex flex-col gap-2">
                            <h3 className="text-gray-400 font-light text-base">Code by</h3>
                            <p className="text-sm cursor-pointer relative group">
                                © Oyunbat
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                            </p>
                        </span>
                        <span className="flex flex-col gap-2">
                            <h3 className="text-gray-400 font-light text-base">Date</h3>
                            <p className="text-sm cursor-pointer relative group">
                                2025.08.26
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                            </p>
                        </span>
                    </div>

                    <div className="flex flex-col  gap-2 items-start">
                        <h3 className="text-gray-400 font-light text-base">Socials</h3>

                        <div className="flex flex-wrap gap-6 items-start">
                            <Magnetic>
                                <Link href="https://www.facebook.com/oyunbat.bat.560/" target="_blank" className="text-sm cursor-pointer relative group">
                                    Facebook
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                            </Magnetic>

                            <Magnetic>
                                <Link href="https://www.instagram.com/oyunbat_dev/?igsh=MTZrc2k3ajI3OXVldg%3D%3D&utm_source=qr#" target="_blank" className="text-sm cursor-pointer relative group">
                                    Instagram
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="https://github.com/Oyunbat1" target="_blank" className="text-sm cursor-pointer relative group">
                                    Github
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="https://www.linkedin.com/in/oyunbat-bat-26376a329/" target="_blank" className="text-sm cursor-pointer relative group">
                                    LinkedIn
                                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                            </Magnetic></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
