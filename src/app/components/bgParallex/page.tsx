'use client';
import React from 'react';
import Parallex from '../Parallex';
import Description from '../Description';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Section from '../Section';

export default function Page() {
    useEffect(() => {
        const lenis = new Lenis({ autoRaf: true })
        return () => lenis.destroy()
    }, [])
    return (
        <main>
            <Parallex />
            <Description />
            <div className='h-[100svh]'>
                <Section />
            </div>

        </main>
    )
}
