"use client";
import Link from "next/link";
import Magnetic from "../../common/Magnetic";

interface SocialProps {
    isTablet: boolean;
}

export default function Social({ isTablet }: SocialProps) {
    return (
        <div className="flex flex-col gap-2 items-start">
            <h3 className="text-gray-400 font-light text-base">Socials</h3>
            <div className={`flex ${isTablet ? 'flex-wrap gap-6' : 'flex-col gap-2 lg:gap-6'} items-start`}>
                <Magnetic>
                    <Link href="https://www.facebook.com/oyunbat.bat.560/" target="_blank" className="text-sm cursor-pointer relative group">
                        Facebook
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </Magnetic>
                
                <Magnetic>
                    <Link href="https://www.instagram.com/oyunbat_dev/?igsh=MTZrc2k3ajI3OXVldg%3D%3D&utm_source=qr#" target="_blank" className="text-sm cursor-pointer relative group">
                        Instagram
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </Magnetic>
                
                <Magnetic>
                    <Link href="https://github.com/Oyunbat1" target="_blank" className="text-sm cursor-pointer relative group">
                        Github
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </Magnetic>
                
                <Magnetic>
                    <Link href="https://www.linkedin.com/in/oyunbat-bat-26376a329/" target="_blank" className="text-sm cursor-pointer relative group">
                        LinkedIn
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                </Magnetic>
            </div>
        </div>
    );
}