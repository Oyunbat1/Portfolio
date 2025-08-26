'use client';

import { useEffect, useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { opacity, slideUp } from "../js/anim"
import { usePathname } from 'next/navigation';
type PreloaderProps = {
    onComplete: () => void;
};

const words = ["Сайнуу", "Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]
const easing: Easing = [0.76, 0, 0.24, 1];
const Preloader = ({ onComplete }: PreloaderProps) => {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const pathname = usePathname();
    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: easing }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: easing, delay: 0.3 }
        }
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className='h-screen w-screen flex items-center justify-center bg-black fixed z-50'>
            {dimension.width > 0 &&
                <>
                    {pathname === "/" ? <motion.p className='flex text-black text-[42px] items-center absolute z-1' variants={opacity} initial="initial" animate="enter"><span className='block w-[10px] h-[10px] bg-black rounded-full mr-[10px]'></span>{words[index]}</motion.p> : ""}
                    <svg className='absolute top-0 w-full h-[calc(100%+_300px)]'>
                        <motion.path className={`${pathname === "/" ? "fill-[#ffffff]" : "fill-[#000000]"}`} variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            }
        </motion.div>
    )
}
export default Preloader