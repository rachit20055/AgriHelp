// Changes: Added Punjabi support (messages_pa.json, "pa" in LangCode, translations)

import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/messages_en.json";
import hi from "@/locales/messages_hi.json";
import mr from "@/locales/messages_mr.json";

// New imports
import ka from "@/locales/messages_ka.json";     // Kannada
import tel from "@/locales/messages_tel.json";   // Telugu
import ta from "@/locales/messages_ta.json";     // Tamil
import ma from "@/locales/messages_ma.json";     // Malayalam
import ass from "@/locales/messages_ass.json";   // Assamese
import maith from "@/locales/messages_maith.json"; // Maithili
import be from "@/locales/messages_be.json";     // Bengali
import pa from "@/locales/messages_pa.json";     // Punjabi

type Messages = Record<string, string>;

// Extended language codes (added pa)
type LangCode =
  | "en"
  | "hi"
  | "mr"
  | "ka"
  | "tel"
  | "ta"
  | "ma"
  | "ass"
  | "maith"
  | "be"
  | "pa"; // ✅ Punjabi

//  Added pa inside translations
const translations: Record<LangCode, Messages> = {
  en, hi, mr, ka, tel, ta, ma, ass, maith, be, pa
};

interface LanguageContextProps {
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LangCode>("en");

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
