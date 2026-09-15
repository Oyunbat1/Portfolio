"use client";
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
});

interface Track {
    label: string;
    code: string;
    description?: string;
    features?: readonly string[];
}

interface Tier {
    code: string;
    name: string;
    price: string;
    meta: string;
    description: string;
    chips: readonly string[];
    tracks?: readonly Track[];
    features: readonly string[];
    recommended?: boolean;
}

interface TiersProps {
    title: string;
    tiers: readonly Tier[];
    recommendedLabel: string;
    ctaLabel: string;
    selectedCode: string | null;
    activeTrack: string | null;
    onTrackChange: (code: string) => void;
    onSelect: (code: string) => void;
    onBook: (code: string) => void;
}

function Check() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-[5px] shrink-0">
            <path
                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                stroke="#6fbf8e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Tiers({
    title,
    tiers,
    recommendedLabel,
    ctaLabel,
    selectedCode,
    activeTrack,
    onTrackChange,
    onSelect,
    onBook,
}: TiersProps) {
    const anySelected = selectedCode !== null;

    const resolveCode = (tier: Tier) =>
        tier.tracks?.length ? activeTrack ?? tier.tracks[0].code : tier.code;

    return (
        <div className={`flex flex-col gap-8 ${josefinSans.className}`}>
            <h2 className="text-[22px] text-white">{title}</h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {tiers.map((tier) => {
                    const code = resolveCode(tier);
                    // A tier with tracks swaps its copy for whichever track is active.
                    const track = tier.tracks?.find((item) => item.code === code);
                    const description = track?.description ?? tier.description;
                    const features = track?.features ?? tier.features;
                    const isSelected = anySelected && selectedCode === code;
                    // The "recommended" emphasis is only a suggestion — once the visitor
                    // has picked something, it steps aside so only their choice stands out.
                    const showRecommended = Boolean(tier.recommended) && !anySelected;
                    const highlighted = isSelected || showRecommended;

                    return (
                        <div
                            key={tier.name}
                            onClick={() => onSelect(code)}
                            className={`relative flex cursor-pointer flex-col rounded-2xl bg-[#1f2021] p-7 border transition ${
                                isSelected
                                    ? "border-brand-light"
                                    : showRecommended
                                      ? "border-brand"
                                      : "border-gray-800 hover:border-gray-600"
                            }`}
                        >
                            <div className="mb-5 flex h-[26px] items-center">
                                {showRecommended && (
                                    <span className="rounded-full bg-brand px-3 py-1 text-[11px] text-white">
                                        {recommendedLabel}
                                    </span>
                                )}
                            </div>

                            <h3 className="min-h-[54px] text-[19px] leading-snug text-white">{tier.name}</h3>

                            <p className="mt-2 text-[34px] leading-none text-white">{tier.price}</p>
                            <p className="mt-2 text-[13px] text-gray-500">{tier.meta}</p>

                            <p className="mt-5 min-h-[88px] text-[14px] font-light leading-relaxed text-gray-400">
                                {description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {tier.tracks?.map((track) => {
                                    const trackActive = code === track.code;
                                    return (
                                        <button
                                            key={track.code}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onTrackChange(track.code);
                                                onSelect(track.code);
                                            }}
                                            className={`rounded-full border px-3 py-1 text-[12px] transition ${
                                                trackActive
                                                    ? "border-brand-light bg-brand/20 text-white"
                                                    : "border-gray-700 text-gray-400 hover:border-brand-light hover:text-white"
                                            }`}
                                        >
                                            {track.label}
                                        </button>
                                    );
                                })}

                                {tier.chips.map((chip) => (
                                    <span
                                        key={chip}
                                        className="rounded-full bg-[#292a2b] px-3 py-1 text-[12px] text-gray-300"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>

                            <ul className="mt-6 mb-8 flex flex-col gap-3">
                                {features.map((feature) => (
                                    <li key={feature} className="flex gap-3">
                                        <Check />
                                        <span className="text-[13px] font-light leading-relaxed text-gray-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBook(code);
                                }}
                                className={`mt-auto w-full rounded-full py-3 text-[14px] transition ${
                                    highlighted
                                        ? "bg-brand text-white hover:bg-brand-hover"
                                        : "border border-gray-700 text-white hover:border-brand-light"
                                }`}
                            >
                                {ctaLabel}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
