"use client"
import gsap from "gsap";
import React from "react";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Bebas_Neue, Playfair_Display } from "next/font/google";

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
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: true,
                onUpdate: e => direction = e.direction,
            }
        })
        requestAnimationFrame(animation)
    }, [])

    const animation = () => {
        if (xPercent <= -100) xPercent = 0;
        if (xPercent >= 100) xPercent = 0;
        gsap.set(slider.current, { xPercent: xPercent })

        xPercent += 0.2 * direction;
        requestAnimationFrame(animation)
    }

    return (
        <div ref={slider} className={`text-[#fff] flex relative  md:bg-amber-200 xl:bg-green-200 w-full justify-center items-center ${bebas.className}`}>
            <p ref={firstText} className="text-[62px] md:text-[100px] xl:text-[170px] absolute -left-100 md:-left-220 xl:-left-280"> - Oyunbat-Batnasan </p>
            <p ref={secondText} className={`text-[62px] md:text-[100px] xl:text-[170px] absolue`}>  Oyunbat-Batnasan </p>
            <p ref={thirdText} className="text-[62px] md:text-[100px] xl:text-[170px] absolute -right-100 md:-right-220 xl:-right-260"> Oyunbat-Batnasan </p>
        </div >
    )
}