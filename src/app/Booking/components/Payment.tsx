"use client";
import { Josefin_Sans } from "next/font/google";
import { toast } from "sonner";

const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
});

interface PaymentProps {
    title: string;
    selectedTitle: string;
    selectedText: string;
    hasSelection: boolean;
    steps: string[];
    rows: { label: string; value: string; copyable?: boolean }[];
    hint: string;
    note: string;
    copyLabel: string;
    copiedLabel: string;
}

export default function Payment({
    title,
    selectedTitle,
    selectedText,
    hasSelection,
    steps,
    rows,
    hint,
    note,
    copyLabel,
    copiedLabel,
}: PaymentProps) {
    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            toast.success(copiedLabel, { duration: 2000 });
        } catch {
            // clipboard blocked (insecure context / permissions) — the value stays visible on screen
        }
    };

    return (
        <div className={`flex flex-col gap-6 ${josefinSans.className}`}>
            <h3 className="text-[22px] text-white">{title}</h3>

            <div
                className={`rounded-xl border px-4 py-3 ${
                    hasSelection ? "border-brand bg-brand/10" : "border-gray-700 bg-transparent"
                }`}
            >
                <p className="text-[12px] text-gray-500">{selectedTitle}</p>
                <p className={`mt-1 text-[14px] ${hasSelection ? "text-white" : "text-gray-500"}`}>
                    {selectedText}
                </p>
            </div>

            <ol className="flex flex-col gap-3">
                {steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-[14px]">
                        <span className="text-brand-light shrink-0">0{i + 1}</span>
                        <span className="text-gray-300 font-light">{step}</span>
                    </li>
                ))}
            </ol>

            <div className="flex flex-col rounded-xl bg-[#1f2021] p-4">
                {rows.map((row, i) => (
                    <div
                        key={i}
                        className={`flex flex-col gap-1 py-3 ${i > 0 ? "border-t border-gray-700" : ""}`}
                    >
                        <p className="text-gray-500 text-[12px]">{row.label}</p>
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-white text-[15px] break-all">{row.value}</p>
                            {row.copyable && (
                                <button
                                    type="button"
                                    onClick={() => handleCopy(row.value)}
                                    className="shrink-0 text-brand-light text-[12px] border border-gray-700 rounded-full px-3 py-1 hover:border-brand-light transition"
                                >
                                    {copyLabel}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-gray-400 text-[13px] font-light">{hint}</p>
            <p className="text-gray-300 text-[13px] font-light">{note}</p>
        </div>
    );
}
