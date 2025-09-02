"use client";

interface SocialAccountProps {
    isTablet: boolean;
}

export default function SocialAccount({ isTablet }: SocialAccountProps) {
    return (
        <div className={`flex ${isTablet ? 'flex-row gap-4 md:flex-row justify-between mt-[30px] mb-[30px] md:mt-[80px] px-6 sm:px-12 md:px-20' : 'flex-row gap-6 sm:gap-10 mb-[40px]'}`}>
            <div className="flex flex-col gap-2 items-start">
                <h3 className="text-gray-400 font-light text-base">Code by</h3>
                <p className="text-sm cursor-pointer relative group">
                    © Oyunbat
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-400 font-light text-base">Date</h3>
                <p className="text-sm cursor-pointer relative group">
                    2025.08.26
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full"></span>
                </p>
            </div>
        </div>
    );
}