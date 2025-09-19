import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from '../common/Magnetic';

const MorePartreon = ({ children, backgroundColor = "#2563EB", ...attributes }: { children: any, backgroundColor?: string }) => {
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
            <div className='text-white'>
                <div
                    className="rounded-l-full rounded-r-full bg-blue-400 border border-[#888] cursor-pointer relative flex items-center justify-center my-2 w-[340px] h-[60px] sm:w-[260px] sm:gap-2 lg:w-[360px] md:w-[260px] md:gap-2 md:mt-[40px] lg:h-[60px] xl:w-[320px] xl:h-[60px] p-[10px] overflow-hidden group  transition duration-300 "
                    onMouseEnter={manageMouseEnter}
                    onMouseLeave={manageMouseLeave}
                    {...attributes}
                >
                    <span className="relative z-10 text-white  font-[600] transition-colors duration-300 group-hover:text-white">
                        {children}
                    </span>
                    <div ref={circle} style={{ backgroundColor }} className='w-full absolute rounded-full h-[150%] top-full'></div>
                </div>
            </div>
        </Magnetic>
    );
};

export default MorePartreon;
