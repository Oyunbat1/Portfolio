"use client";
import Image from "next/image";
import { useState } from "react";

/** Project screenshot; falls back to a plain title tile when the file is missing. */
export default function ProjectThumb({
    src,
    color,
    title,
    className,
    wrapperClassName = "p-[20px]",
}: {
    src: string;
    color: string;
    title: string;
    className: string;
    wrapperClassName?: string;
}) {
    const [failed, setFailed] = useState(false);

    return (
        <div style={{ backgroundColor: color }} className={wrapperClassName}>
            {failed ? (
                <div className={`${className} flex items-center justify-center text-center text-white/80 uppercase tracking-wide`}>
                    {title}
                </div>
            ) : (
                <Image
                    src={`/${src}`}
                    alt={title}
                    width={200}
                    height={200}
                    className={className}
                    onError={() => setFailed(true)}
                />
            )}
        </div>
    );
}
