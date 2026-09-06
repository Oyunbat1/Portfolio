"use client";
import { useLang } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionary";

const options: Lang[] = ["mn", "en"];

export default function LanguageToggle({ className = "" }: { className?: string }) {
    const { lang, setLang } = useLang();

    return (
        <div className={`flex items-center gap-1 text-[13px] ${className}`}>
            {options.map((option, i) => (
                <span key={option} className="flex items-center gap-1">
                    {i > 0 && <span className="opacity-40">/</span>}
                    <button
                        type="button"
                        onClick={() => setLang(option)}
                        aria-label={option === "mn" ? "Монгол" : "English"}
                        className={`uppercase cursor-pointer transition-opacity duration-200 ${lang === option ? "opacity-100" : "opacity-40 hover:opacity-70"
                            }`}
                    >
                        {option}
                    </button>
                </span>
            ))}
        </div>
    );
}
