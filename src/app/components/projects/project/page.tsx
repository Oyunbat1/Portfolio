'use client';
import React from 'react'

export default function index({ index, title, manageModal }: { index: number, title: string, manageModal: any }) {

    return (
        <div
            onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
            // onMouseEnter={(e) => {
            //     const rect = e.currentTarget.getBoundingClientRect();
            //     const x = rect.left + rect.width / 2;
            //     const y = rect.top + rect.height / 2;
            //     manageModal(true, index, x, y);
            // }}
            // onMouseLeave={() => manageModal(false, index, 0, 0)}
            className="flex w-full justify-between items-center p-[50px_100px] border-t border-solid border-t-[rgb(201,201,201)] cursor-pointer transition-all duration-200 hover:opacity-50 group"
        >
            <h2 className="text-[60px] m-0 font-[400] transition-transform duration-500 group-hover:-translate-x-2">
                {title}
            </h2>
            <p className="font-[300] transition-transform duration-300 group-hover:translate-x-2">
                Design & Development
            </p>
        </div>

    )
}
