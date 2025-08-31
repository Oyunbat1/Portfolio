"use client";
import Nav from "./Nav";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Magnetic from "../common/Magnetic"
const BurgerMenu = ({ isActive, setIsActive }: { isActive: any; setIsActive: any }) => {
    const [isMobile, setIsMobile] = useState(false)
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const el = buttonRef.current;
        if (!el) return;

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [x, y]);

    return (
        <>
            <Magnetic>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    onClick={() => setIsActive(!isActive)}
                    className={`fixed mt-[60px] right-6 m-[20px] z-30 ${isMobile ? ` top-1 w-[60px] h-[60px] bg-black hover:bg-blue-600 transition-colors duration-300 ` : `w-[80px] h-[80px] bg-black hover:bg-blue-600 transition-colors duration-300 `} rounded-full cursor-pointer flex items-center justify-center overflow-hidden  `}
                >

                    <motion.div
                        className="absolute inset-0 rounded-full  "
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <div
                        className={`relative w-full z-10
                        before:content-[''] before:block before:h-px before:w-2/5 before:mx-auto before:bg-white before:relative before:transition-transform before:duration-300 
                        after:content-[''] after:block after:h-px after:w-2/5 after:mx-auto after:bg-white after:relative after:transition-transform after:duration-300
                        ${isActive
                                ? "before:rotate-[-45deg] before:top-0 after:rotate-[45deg] after:top-[-1px]"
                                : "before:top-[5px] after:top-[-5px]"
                            }`}
                    />
                </motion.div>
            </Magnetic>


            <AnimatePresence mode="wait">
                {isActive && <Nav setIsActive={setIsActive} />}
            </AnimatePresence>
        </>
    );
};

export default BurgerMenu;
