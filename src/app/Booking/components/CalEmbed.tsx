"use client";
import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps {
    calLink: string;
    namespace: string;
}

export default function CalEmbed({ calLink, namespace }: CalEmbedProps) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace });
            cal("ui", {
                theme: "dark",
                styles: { branding: { brandColor: "#307248" } },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, [namespace]);

    return (
        <Cal
            namespace={namespace}
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "600px" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" }}
        />
    );
}
