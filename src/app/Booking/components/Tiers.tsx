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

export interface Tier {
    code: string;
    name: string;
    price: string;
    meta: string;
    description: string;
    chips: readonly string[];
    tracks?: readonly Track[];
    features: readonly string[];
    recommended?: boolean;
    // Kept in the dictionary for later, but not shown on the page.
    hidden?: boolean;
}

interface TiersProps {
    title: string;
    tiers: readonly Tier[];
    recommendedLabel: string;
    ctaLabel: string;
    trackLabel: string;
    includesLabel: string;
    selectedCode: string | null;
    activeTrack: string | null;
    onTrackChange: (code: string) => void;
    onSelect: (code: string) => void;
    onBook: (code: string) => void;
}

function Check() {
    return (
        <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                    d="M2.5 7.5L5.5 10.5L11.5 3.5"
                    stroke="#6fbf8e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

function Arrow() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const resolveCode = (tier: Tier, activeTrack: string | null) =>
    tier.tracks?.length ? activeTrack ?? tier.tracks[0].code : tier.code;

// One offer on the page: a wide card — the offer on the left, what it covers on the right.
function FeaturedTier({
    tier,
    ctaLabel,
    trackLabel,
    includesLabel,
    activeTrack,
    onTrackChange,
    onSelect,
    onBook,
}: { tier: Tier } & Omit<TiersProps, "title" | "tiers" | "recommendedLabel" | "selectedCode">) {
    const code = resolveCode(tier, activeTrack);
    const track = tier.tracks?.find((item) => item.code === code);
    const description = track?.description ?? tier.description;
    const features = track?.features ?? tier.features;

    return (
        <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-[#1f2021]">
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
                <div className="flex flex-col p-7 md:p-10">
                    <span className="w-fit rounded-full border border-brand/40 px-3 py-1 text-[12px] text-brand-light">
                        {tier.meta}
                    </span>

                    <h3 className="mt-6 text-[26px] leading-tight text-white md:text-[30px]">{tier.name}</h3>

                    <p className="mt-4 text-[48px] leading-none text-white md:text-[60px]">{tier.price}</p>

                    <p className="mt-6 max-w-[460px] text-[15px] font-light leading-relaxed text-gray-300">
                        {description}
                    </p>

                    {tier.tracks?.length ? (
                        <div className="mt-8">
                            <p className="mb-3 text-[12px] uppercase tracking-[0.12em] text-gray-400">{trackLabel}</p>
                            <div
                                role="tablist"
                                className="inline-flex w-full max-w-[420px] rounded-full border border-gray-800 p-1"
                            >
                                {tier.tracks.map((item) => {
                                    const active = code === item.code;
                                    return (
                                        <button
                                            key={item.code}
                                            type="button"
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() => {
                                                onTrackChange(item.code);
                                                onSelect(item.code);
                                            }}
                                            className={`flex-1 rounded-full px-4 py-2.5 text-[14px] transition ${
                                                active
                                                    ? "bg-[#2e2f30] text-white"
                                                    : "text-gray-500 hover:text-gray-200"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}

                    <button
                        type="button"
                        onClick={() => onBook(code)}
                        className="mt-10 flex w-full items-center justify-center gap-2 rounded-full border border-gray-700 py-3.5 text-[15px] text-white transition hover:border-brand-light hover:text-brand-light lg:w-fit lg:px-10"
                    >
                        {ctaLabel}
                        <Arrow />
                    </button>
                </div>

                <div className="border-t border-gray-800 bg-[#1b1c1d] p-7 md:p-10 lg:border-l lg:border-t-0">
                    <p className="text-[12px] uppercase tracking-[0.12em] text-gray-400">{includesLabel}</p>
                    <ul className="mt-6 flex flex-col gap-5">
                        {features.map((feature) => (
                            <li key={feature} className="flex gap-3">
                                <Check />
                                <span className="text-[15px] font-light leading-relaxed text-gray-200">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Tiers(props: TiersProps) {
    const { title, tiers, recommendedLabel, ctaLabel, selectedCode, activeTrack, onTrackChange, onSelect, onBook } = props;
    const visible = tiers.filter((tier) => !tier.hidden);
    const anySelected = selectedCode !== null;

    return (
        <div className={`flex flex-col gap-8 ${josefinSans.className}`}>
            <h2 className="text-[22px] text-white">{title}</h2>

            {visible.length === 1 ? (
                <FeaturedTier tier={visible[0]} {...props} />
            ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {visible.map((tier) => {
                        const code = resolveCode(tier, activeTrack);
                        const track = tier.tracks?.find((item) => item.code === code);
                        const description = track?.description ?? tier.description;
                        const features = track?.features ?? tier.features;
                        const isSelected = anySelected && selectedCode === code;
                        // "Recommended" is only a suggestion — it steps aside once the visitor picks.
                        const showRecommended = Boolean(tier.recommended) && !anySelected;
                        const highlighted = isSelected || showRecommended;

                        return (
                            <div
                                key={tier.name}
                                onClick={() => onSelect(code)}
                                className={`relative flex cursor-pointer flex-col rounded-2xl border bg-[#1f2021] p-7 transition ${
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
                                    {tier.tracks?.map((item) => (
                                        <button
                                            key={item.code}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onTrackChange(item.code);
                                                onSelect(item.code);
                                            }}
                                            className={`rounded-full border px-3 py-1 text-[12px] transition ${
                                                code === item.code
                                                    ? "border-brand-light bg-brand/20 text-white"
                                                    : "border-gray-700 text-gray-400 hover:border-brand-light hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                    {tier.chips.map((chip) => (
                                        <span key={chip} className="rounded-full bg-[#292a2b] px-3 py-1 text-[12px] text-gray-300">
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                                <ul className="mb-8 mt-6 flex flex-col gap-3">
                                    {features.map((feature) => (
                                        <li key={feature} className="flex gap-3">
                                            <Check />
                                            <span className="text-[13px] font-light leading-relaxed text-gray-300">{feature}</span>
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
            )}
        </div>
    );
}
