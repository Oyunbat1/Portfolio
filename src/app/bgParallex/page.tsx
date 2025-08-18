'use client';
import React from 'react';
import Parallex from '../components/Parallex';
import Description from '../components/Description';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Section from '../components/Section';

export default function Page() {
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])
    return (
        <main>
            <Parallex />
            <Description />
            <div className='h-screen'>
                <Section />
            </div>
        </main>
    )
}