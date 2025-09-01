import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from '../common/Magnetic';

const RoundedButton = ({ children, backgroundColor, ...attributes }: { children: any, backgroundColor?: string }) => {
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
            <div style={{ backgroundColor }} className='z-30 rounded-full text-white'>
                <div
                    className="rounded-full border border-[#888] cursor-pointer relative flex items-center justify-center w-[140px] h-[140px] lg:w-[130px] xl:w-[160px] xl:h-[160px] lg:h-[130px] p-[10px] overflow-hidden group hover:bg-blue-600 transition duration-300"
                    onMouseEnter={manageMouseEnter}
                    onMouseLeave={manageMouseLeave}
                    {...attributes}
                >
                    {children}
                    <div ref={circle} style={{ backgroundColor }} className='w-full absolute rounded-full h-[150%] top-full'></div>
                </div>
            </div>
        </Magnetic>
    );
};

export default RoundedButton;
