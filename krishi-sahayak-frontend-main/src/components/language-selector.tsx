import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ka", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "tel", name: "Telugu", native: "తెలుగు" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "ma", name: "Malayalam", native: "മലയാളം" },
  { code: "ass", name: "Assamese", native: "অসমীয়া" },
  { code: "maith", name: "Maithili", native: "मैथिली" },
  { code: "be", name: "Bengali", native: "বাংলা" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" }
];

interface LanguageSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  userId?: string; // Needed to store language preference in backend
}

export function LanguageSelector({ value, onValueChange, userId }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  const currentValue = value || language;

  // Wrapper to handle local + backend update
  const handleChange = async (langCode: string) => {
    setLanguage(langCode); // update frontend
    if (userId) {
      try {
        await fetch(`http://localhost:8081/api/language/set/${userId}/${langCode}`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to save language preference:", error);
      }
    }
    onValueChange?.(langCode);
  };

  // On mount, fetch saved language from backend
  useEffect(() => {
    if (!userId) return;
    const fetchLang = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/language/get/${userId}`);
        const savedLang = await res.text();
        if (savedLang && savedLang !== language) setLanguage(savedLang);
      } catch (error) {
        console.error("Failed to fetch language preference:", error);
      }
    };
    fetchLang();
  }, [userId]);

  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className="w-40 h-12 text-base">
        <SelectValue placeholder={t('language.select')} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="text-base py-3">
            {lang.native} ({lang.name})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
