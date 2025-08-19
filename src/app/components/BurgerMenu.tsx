"use client";
import Nav from "./Nav";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const BurgerMenu = ({ isActive, setIsActive }: { isActive: any; setIsActive: any }) => {
    const [isMobile, setIsMobile] = useState(false)
    console.log(isMobile, "burger")
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 10 });
    const springY = useSpring(y, { stiffness: 200, damping: 10 });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const el = buttonRef.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            x.set(relX * 0.3);
            y.set(relY * 0.3);
        };

        const reset = () => {
            x.set(0);
            y.set(0);
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", reset);

        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", reset);
            window.removeEventListener("resize", handleResize);
        };

    }, [x, y]);

    return (
        <>
            <motion.div
                ref={buttonRef}
                style={{
                    x: springX,
                    y: springY,
                }}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={() => setIsActive(!isActive)}
                className={`fixed mt-[60px] right-6 m-[20px] z-30 ${isMobile ? `w-[60px] h-[60px]` : `w-[80px] h-[80px] bg-black`} rounded-full cursor-pointer flex items-center justify-center overflow-hidden  `}
            >

                <motion.div
                    className="absolute inset-0 rounded-full bg-black"
                    whileHover={{ background: "linear-gradient(to top, #455CE9 100%, black 0%)" }}

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

            <AnimatePresence mode="wait">
                {isActive && <Nav setIsActive={() => { }} />}
            </AnimatePresence>
        </>
    );
};

export default BurgerMenu;
