import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../js/anim';

type LinkData = {
    title: string;
    href: string;
    index: number;
};

type LinkProps = {
    data: LinkData;
    isActive: boolean;
    setSelectedIndicator: (href: string) => void;
};

const Link = ({ data, isActive, setSelectedIndicator }: LinkProps) => {
    const { title, href, index } = data;
    return (

        <motion.div
            className='relative flex items-center'
            onMouseEnter={() => { setSelectedIndicator(href) }}
            custom={index}
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"       >
            <motion.div
                variants={scale}
                animate={isActive ? "open" : "closed"}
                className='w-[10px] h-[10px] bg-white rounded-full absolute -left-[30px]'>

            </motion.div>

            <NextLink
                className="transform transition duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] hover:translate-x-4 group"
                href={href} >
                {title}
            </NextLink>


        </motion.div>

    )
}
export default Link