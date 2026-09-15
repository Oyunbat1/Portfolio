"use client";
import { useRef, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { useLang } from "@/i18n/LanguageProvider";
import CalEmbed from "./components/CalEmbed";
import Tiers from "./components/Tiers";
import Payment from "./components/Payment";

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
});

// Cal.com event: cal.com/oyunbat-dev/60min
const CAL_LINK = "oyunbat-dev/60min";
const CAL_NAMESPACE = "60min";

export default function Booking() {
    const { t } = useLang();
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [activeTrack, setActiveTrack] = useState<string | null>(null);

    // Clicking a card or a track only marks the choice; the CTA also jumps to the calendar.
    const handleSelect = (code: string) => setSelectedCode(code);

    const handleBook = (code: string) => {
        setSelectedCode(code);
        calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Resolve the label shown in the payment block from the selected code.
    const selected = t.booking.tiers
        .flatMap((tier) =>
            tier.tracks?.length
                ? tier.tracks.map((track) => ({
                      code: track.code,
                      label: `${tier.name} · ${track.label}`,
                      price: tier.price,
                  }))
                : [{ code: tier.code, label: tier.name, price: tier.price }],
        )
        .find((entry) => entry.code === selectedCode);

    const referenceValue = selected
        ? t.booking.referenceTemplate.replace("{code}", selected.code)
        : t.booking.referenceValue;

    const referenceHint = selected
        ? t.booking.referenceHintTemplate.replace("{code}", selected.code)
        : t.booking.referenceHint;

    return (
        <div className="relative min-h-screen bg-[#292a2b] px-5 pb-[80px] pt-[120px] text-white md:px-9">
            <div className="mx-auto flex max-w-[1180px] flex-col gap-16">
                <div className="flex max-w-[700px] flex-col gap-4">
                    <h1 className={`${josefinSans.className} text-[36px] lg:text-[54px]`}>
                        {t.booking.headline}
                    </h1>
                    <p className="text-[16px] font-light text-gray-400 lg:text-[18px]">
                        {t.booking.subheadline}
                    </p>
                </div>

                <Tiers
                    title={t.booking.tiersTitle}
                    tiers={t.booking.tiers}
                    recommendedLabel={t.booking.recommendedLabel}
                    ctaLabel={t.booking.ctaLabel}
                    selectedCode={selectedCode}
                    activeTrack={activeTrack}
                    onTrackChange={setActiveTrack}
                    onSelect={handleSelect}
                    onBook={handleBook}
                />

                <div
                    ref={calendarRef}
                    className="flex scroll-mt-[100px] flex-col gap-10 lg:flex-row lg:gap-16"
                >
                    <div className="w-full lg:w-[340px] lg:shrink-0">
                        <Payment
                            title={t.booking.paymentTitle}
                            selectedTitle={t.booking.selectedTitle}
                            selectedText={
                                selected
                                    ? `${selected.label} — ${selected.price}`
                                    : t.booking.noSelectionText
                            }
                            hasSelection={Boolean(selected)}
                            steps={t.booking.paymentSteps}
                            rows={[
                                { label: t.booking.bankLabel, value: t.booking.bankValue },
                                { label: t.booking.accountLabel, value: t.booking.accountValue, copyable: true },
                                { label: t.booking.accountNameLabel, value: t.booking.accountNameValue },
                                { label: t.booking.referenceLabel, value: referenceValue, copyable: Boolean(selected) },
                            ]}
                            hint={referenceHint}
                            note={t.booking.paymentNote}
                            copyLabel={t.booking.copyLabel}
                            copiedLabel={t.booking.copiedLabel}
                        />
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-[#1f2021]">
                        <CalEmbed calLink={CAL_LINK} namespace={CAL_NAMESPACE} />
                    </div>
                </div>
            </div>
        </div>
    );
}
