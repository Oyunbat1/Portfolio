"use client"
import { opacity, slideUp } from "../js/anim"
import { useEffect, useState } from 'react';
import { motion, Easing } from 'framer-motion';
import { usePathname } from 'next/navigation';

const easing: Easing = [0.76, 0, 0.24, 1];
type PreloaderProps = {
    onComplete?: () => void;
};

const PageLoader = ({ onComplete }: PreloaderProps) => {
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const pathname = usePathname();
    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.6, ease: easing }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.6, ease: easing, delay: 0.2 }
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }
        
        updateDimension();
        window.addEventListener('resize', updateDimension);
        
        return () => window.removeEventListener('resize', updateDimension);
    }, [])

   
    const getPageName = (path: string) => {
        if (path === "/") return "Home";
        return path.substring(1);
    };

    const pageName = getPageName(pathname);
    const isAboutPage = pathname === "/About";

    return (
        <motion.div 
            variants={slideUp} 
            initial="initial" 
            exit="exit" 
            className='h-screen w-screen flex items-center justify-center bg-black fixed z-50'
            onAnimationComplete={(definition) => {
                if (definition === "exit" && onComplete) {
                    onComplete();
                }
            }}
        >
            {dimension.width > 0 &&
                <>
                    <motion.p 
                        className={`flex text-[42px] items-center absolute z-1 text-white`}
                        variants={opacity} 
                        initial="initial" 
                        animate="enter"
                    >
                        {pageName}
                    </motion.p>
                    <svg className='absolute top-0 w-full h-[calc(100%+_300px)]'>
                        <motion.path 
                            className={`fill-[#000000]`} 
                            variants={curve} 
                            initial="initial" 
                            exit="exit"
                        ></motion.path>
                    </svg>
                </>
            }
        </motion.div>
    )
}

export default PageLoader