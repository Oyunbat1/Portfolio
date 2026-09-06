"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dictionary, type Dictionary, type Lang } from "./dictionary";

const STORAGE_KEY = "lang";

const LanguageContext = createContext<{
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: Dictionary;
}>({ lang: "mn", setLang: () => { }, t: dictionary.mn });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // always "mn" on the server so the first client render matches; the stored
    // choice is applied in the effect below.
    const [lang, setLangState] = useState<Lang>("mn");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "en" || saved === "mn") setLangState(saved);
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (next: Lang) => {
        setLangState(next);
        localStorage.setItem(STORAGE_KEY, next);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: dictionary[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLang = () => useContext(LanguageContext);
