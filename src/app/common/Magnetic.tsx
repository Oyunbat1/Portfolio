import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function index({ children }: { children: any }) {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magnetic.current as HTMLDivElement, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current as HTMLDivElement, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = (magnetic.current as HTMLDivElement).getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        (magnetic.current as HTMLDivElement).addEventListener("mousemove", handleMouseMove);
        (magnetic.current as HTMLDivElement).addEventListener("mouseleave", handleMouseLeave);

        return () => {
            (magnetic.current as HTMLDivElement)?.removeEventListener("mousemove", handleMouseMove);
            (magnetic.current as HTMLDivElement)?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);


    return (
        React.cloneElement(children, { ref: magnetic })
    )
}
