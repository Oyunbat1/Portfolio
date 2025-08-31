import Image from "next/image";
import Background from "../../../public/bg.png";
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { Josefin_Sans } from "next/font/google";
import Text from "./Text"
const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});
export default function Section() {

    const container = useRef(null);

    const { scrollYProgress } = useScroll({

        target: container,

        offset: ["start end", 'end start']

    })

    const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);



    return (
        <div
            ref={container}
            className='relative flex items-center justify-center h-screen '
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <Text />
            <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>

                <motion.div style={{ y }} className='relative w-full h-full'>

                    <Image src={Background} fill alt="image" style={{ objectFit: "cover" }} />

                </motion.div>

            </div>

        </div>

    )

}