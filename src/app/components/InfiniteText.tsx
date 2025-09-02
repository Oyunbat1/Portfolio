"use client"
import gsap from "gsap";
import React from "react";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: "400"
})
export default function InfiniteText() {

    const firstText = useRef<HTMLParagraphElement>(null);
    const secondText = useRef<HTMLParagraphElement>(null);
    const thirdText = useRef<HTMLParagraphElement>(null);
    const slider = useRef<HTMLDivElement>(null);
    let xPercent = 0
    let direction = 1

    useEffect(() => {
        // Check if refs are available before proceeding
        if (!slider.current) return;
        
        gsap.registerPlugin(ScrollTrigger)
        
        // Add null check for slider.current
        const sliderElement = slider.current;
        
        gsap.to(sliderElement, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: true,
                onUpdate: e => direction = e.direction,
            }
        })
        
        requestAnimationFrame(animation)
        
        // Cleanup function
        return () => {
            // Kill the ScrollTrigger to prevent memory leaks
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, [])

    const animation = () => {
        // Add null check before using slider.current
        if (!slider.current) return;
        
        if (xPercent <= -100) xPercent = 0;
        if (xPercent >= 100) xPercent = 0;
        gsap.set(slider.current, { xPercent: xPercent })

        xPercent += 0.2 * direction;
        requestAnimationFrame(animation)
    }

    return (
        <div ref={slider} className={`text-[#fff] flex relative  md:bg-amber-200 lg:bg-red-400 xl:bg-green-200 w-full justify-center items-center ${bebas.className}`}>
            <p ref={firstText} className="text-[132px] md:text-[152px] xl:text-[170px] absolute -left-260 md:-left-260 xl:-left-280">  Oyunbat-Batnasan </p>
            <p ref={secondText} className={`text-[132px] md:text-[152px] xl:text-[170px] absolute whitespace-nowrap`}>  Oyunbat-Batnasan </p>
            <p ref={thirdText} className="text-[132px] md:text-[152px] xl:text-[170px] absolute -right-260 md:-right-240 xl:-right-260 whitespace-nowrap"> Oyunbat-Batnasan </p>
        </div >
    )
}