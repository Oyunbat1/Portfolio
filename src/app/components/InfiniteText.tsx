"use client"
import gsap from "gsap";
import React from "react";
import { useEffect, useState, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
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
        gsap.set(firstText.current, { xPercent: xPercent })
        gsap.set(secondText.current, { xPercent: xPercent })
        gsap.set(thirdText.current, { xPercent: xPercent })

        xPercent += 0.1 * direction;
        requestAnimationFrame(animation)
    }

    return (
        <div className="text-[#fff] flex relative bg-red-200 md:bg-amber-200 xl:bg-green-200 w-full font-serif  ">
            <p ref={firstText} className="text-[52px] md:text-[90px] xl:text-[150px] absolute -left-130 md:-left-220 xl:-left-350"> - Oyunbat-Batnasan </p>
            <p ref={secondText} className="text-[52px] md:text-[90px] xl:text-[150px] ">  Oyunbat-Batnasan </p>
            <p ref={thirdText} className="text-[52px] md:text-[90px] xl:text-[150px] absolute -right-110 md:-right-220 xl:-right-320"> Oyunbat-Batnasan </p>
        </div>
    )
}