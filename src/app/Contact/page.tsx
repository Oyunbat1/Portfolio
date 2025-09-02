"use client";
import Image from "next/image";
import GetInRounded from "../common/RoundedButton";
import { useRef, useState, useEffect } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "../common/Magnetic";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import AboutMeImage from "../../../public/mobile/profile.jpg"
import { useMutation } from '@apollo/client/react';
import { CREATE_MESSAGE } from '../../graphql/mutations';

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});

export default function Contact() {
    const container = useRef(null);
    const [isTablet, setIsTablet] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });
    const [createMessage, { loading, error, data }] = useMutation(CREATE_MESSAGE);

    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth <= 764);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await createMessage({
                variables: formData
            });

            if (result.data) {
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    service: '',
                    message: ''
                });
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"],
    });
    const x = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

    return (
        <>
            {isTablet ? <motion.div
                style={{ y }}
                ref={container}
                className="text-white flex flex-col gap-6 items-center  bg-[#292a2b] relative h-auto"
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
                    <span className={`flex items-center gap-2 ${josefinSans.className} text-[46px]`}>
                        <Image
                            alt="image"
                            src={AboutMeImage}
                            width={80}
                            height={80}
                            className="object-cover w-[50px] h-[50px] rounded-full"
                        />
                        Let's start a </span>
                    <span className={`flex ${josefinSans.className} text-[46px]`}>project together</span>
                </div>
                <div className=" w-full flex flex-col gap-4 items-start pl-[20px]">
                    <div className="flex flex-col gap-2"><h3 className={`text-gray-400 font-light text-base`}>Contact details</h3>
                        <div>  <p>oyunbat9958@gmail.com</p>
                            <p>+976 80661615</p></div></div>
                    <div className="flex flex-col gap-2"><h3 className={`text-gray-400 font-light text-base`}>Location</h3>
                        <p>Ulaanbaatar,Mongolia</p>
                    </div>
                </div>
                <div className=" mt-[20px] p-[0px_20px] w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                        <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                            <div className="flex items-center gap-2 pt-[20px] ">
                                <p className="text-gray-400 text-[12px] ">01</p>
                                <label htmlFor="name" className="text-[20px]">What's your name?</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Oyunbat Bat *"
                                className="ml-6 text-[18px]"
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>
                        <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                            <div className="flex items-center gap-2 pt-[20px] ">
                                <p className="text-gray-400 text-[12px] ">02</p>
                                <label htmlFor="email" className="text-[20px]">What's your email?</label>
                            </div>
                            <input
                                type="email"
                                placeholder="oyunbat9958@gmail.com *"
                                className="ml-6 text-[18px]"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                            <div className="flex items-center gap-2 pt-[20px] ">
                                <p className="text-gray-400 text-[12px] ">03</p>
                                <label htmlFor="company" className="text-[20px]">What's the name of your organization?</label>
                            </div>
                            <input
                                type="text"
                                placeholder="oyunbatcompany@.com *"
                                className="ml-6 text-[18px]"
                                required
                                value={formData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                            />
                        </div>
                        <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                            <div className="flex items-center gap-2 pt-[20px] ">
                                <p className="text-gray-400 text-[12px] ">04</p>
                                <label htmlFor="service" className="text-[20px]">What services are you looking for?</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Web development , Designing...*"
                                className="ml-6 text-[18px]"
                                required
                                value={formData.service}
                                onChange={(e) => handleInputChange('service', e.target.value)}
                            />
                        </div>
                        <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                            <div className="flex items-center gap-2 pt-[20px] ">
                                <p className="text-gray-400 text-[12px] ">05</p>
                                <label htmlFor="message" className="text-[20px]">Your message?</label>
                            </div>
                            <textarea
                                placeholder="Hello Oyunbat,can you help me with ...*"
                                className="ml-6 text-[18px] min-h-[100px] resize-none"
                                required
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                            />
                        </div>





                    </form>
                </div >
                <div className=" m-[40px_0px] relative">
                    <motion.div
                        style={{ x }}
                        className="  -translate-x-1/2 md:translate-x-0"
                    >
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="disabled:opacity-50"
                        >
                            <GetInRounded
                                backgroundColor={"#2563EB"}
                            >
                                <p className={`m-0 text-[18px] md:text-base font-light z-50 ${josefinSans.className} font-[500] relative`}>
                                    {loading ? 'Sending...' : 'Send it!'}
                                </p>
                            </GetInRounded>
                        </button>
                    </motion.div>
                </div>

                <div className="">
                    <div className="flex flex-col gap-4 md:flex-row justify-between  mt-[30px] mb-[30px] md:mt-[80px] px-6 sm:px-12 md:px-20">
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
                                </Magnetic>
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between sm:flex-row  gap-6 sm:gap-10 mb-[40px]">
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
                    </div>
                </div>

            </motion.div > : <motion.div
                style={{ y }}
                ref={container}
                className="text-white flex flex-col gap-6 items-center  bg-[#292a2b] relative h-auto "
            >
                <div className=" w-full flex justify-around mt-[40px]">
                    <div className="flex flex-col gap-10">
                        <span className={`flex items-center gap-2 w-[400px] ${josefinSans.className} text-[46px] lg:text-[66px] lg:w-[560px]`}>
                            Let's start a project together</span>
                        <div className=" mt-[20px] p-[0px_20px] w-full">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                                <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                                    <div className="flex items-center gap-2 pt-[20px] ">
                                        <p className="text-gray-400 text-[12px] ">01</p>
                                        <label htmlFor="name" className="text-[20px]">What's your name?</label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Oyunbat Bat *"
                                        className="ml-6 text-[18px]"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                </div>
                                <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                                    <div className="flex items-center gap-2 pt-[20px] ">
                                        <p className="text-gray-400 text-[12px] ">02</p>
                                        <label htmlFor="email" className="text-[20px]">What's your email?</label>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="oyunbat9958@gmail.com *"
                                        className="ml-6 text-[18px]"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                                <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                                    <div className="flex items-center gap-2 pt-[20px] ">
                                        <p className="text-gray-400 text-[12px] ">03</p>
                                        <label htmlFor="company" className="text-[20px]">What's the name of your organization?</label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="oyunbatcompany@.com *"
                                        className="ml-6 text-[18px]"
                                        required
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                    />
                                </div>
                                <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                                    <div className="flex items-center gap-2 pt-[20px] ">
                                        <p className="text-gray-400 text-[12px] ">04</p>
                                        <label htmlFor="service" className="text-[20px]">What services are you looking for?</label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Web development , Designing...*"
                                        className="ml-6 text-[18px]"
                                        required
                                        value={formData.service}
                                        onChange={(e) => handleInputChange('service', e.target.value)}
                                    />
                                </div>
                                <div className={` flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                                    <div className="flex items-center gap-2 pt-[20px] ">
                                        <p className="text-gray-400 text-[12px] ">05</p>
                                        <label htmlFor="message" className="text-[20px]">Your message?</label>
                                    </div>
                                    <textarea
                                        placeholder="Hello Oyunbat,can you help me with ...*"
                                        className="ml-6 text-[18px] min-h-[100px] resize-none"
                                        required
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                    />
                                </div>

                            </form>
                        </div >
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
                        <div className=" w-full flex flex-col gap-4 items-start pl-[20px]">
                            <div className="flex flex-col gap-2"><h3 className={`text-gray-400 font-light text-base`}>Contact details</h3>
                                <div className="flex flex-col gap-2 lg:gap-6">  <p>oyunbat9958@gmail.com</p>
                                    <p>+976 80661615</p></div></div>
                            <div className="flex flex-col gap-2"><h3 className={`text-gray-400 font-light text-base`}>Location</h3>
                                <p>Ulaanbaatar,Mongolia</p>
                            </div>
                            <div className="flex flex-col  gap-2 items-start">
                                <h3 className="text-gray-400 font-light text-base">Socials</h3>
                                <div className="flex flex-col gap-2 lg:gap-6 items-start">
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
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" m-[40px_0px] relative">
                    <motion.div
                        style={{ x }}
                        className="  -translate-x-1/2 md:translate-x-0"
                    >
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="disabled:opacity-50"
                        >
                            <GetInRounded
                                backgroundColor={"#2563EB"}
                            >
                                <p className={`m-0 text-[18px] md:text-base font-light z-50 ${josefinSans.className} font-[500] relative`}>
                                    {loading ? 'Sending...' : 'Send it!'}
                                </p>
                            </GetInRounded>
                        </button>
                    </motion.div>
                </div>

                <div className="w-full">
                    <div className="flex w-full  justify-around mb-[30px] ">
                        <div className="flex flex-col  gap-2 items-start">
                            <h3 className="text-gray-400 font-light text-base">Socials</h3>
                            <div className="flex  gap-6 items-start">
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
                                </Magnetic>
                            </div>
                        </div>

                        <div className="flex flex-row   gap-6 sm:gap-10 mb-[40px]">
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
                    </div>
                </div>
            </motion.div >}
        </>
    );
}
