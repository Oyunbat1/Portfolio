import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from '../common/Magnetic';

const MoreButton = ({ children, backgroundColor = "#455CE9", ...attributes }: { children: any, backgroundColor?: string }) => {
    const circle = useRef<HTMLDivElement | null>(null);
    const timeline = useRef<GSAPTimeline | null>(null);
    let timeoutId: number | null = null;

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });
        timeline.current
            .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
            .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit")
    }, []);

    const manageMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeline.current?.tweenFromTo('enter', 'exit');
    };

    const manageMouseLeave = () => {
        timeoutId = window.setTimeout(() => {
            timeline.current?.play();
        }, 300);
    };

    return (
        <Magnetic>
            <div className='text-black'>
                <div
                    className="rounded-l-full rounded-r-full border border-[#888] cursor-pointer relative flex items-center justify-center mt-[80px] w-[200px] h-[80px] lg:w-[130px]  lg:h-[130px] xl:w-[200px] xl:h-[80px] p-[10px] overflow-hidden group  transition duration-300 "
                    onMouseEnter={manageMouseEnter}
                    onMouseLeave={manageMouseLeave}
                    {...attributes}
                >
                    <span className="relative z-10 text-black font-[600] transition-colors duration-300 group-hover:text-white">
                        {children}
                    </span>
                    <div ref={circle} style={{ backgroundColor }} className='w-full absolute rounded-full h-[150%] top-full'></div>
                </div>
            </div>
        </Magnetic>
    );
};

export default MoreButton;
