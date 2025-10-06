import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BottomNav } from "@/components/navigation/bottom-nav"; // added

const LanguageSettings: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "hi" | "mr" | "ka" | "tel" | "ta" | "ma" | "ass" | "maith" | "be" | "pa");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 pb-20">
      {/* added pb-20 to avoid nav overlap */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{t("language.title")}</h1>
        <p className="text-gray-600 mb-6">{t("language.subtitle")}</p>

        {/* Dropdown for language selection */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="en">{t("language.english")}</option>
          <option value="hi">{t("language.hindi")}</option>
          <option value="mr">{t("language.marathi")}</option>
          <option value="ka">{t("language.kannada")}</option>
          <option value="tel">{t("language.telugu")}</option>
          <option value="ta">{t("language.tamil")}</option>
          <option value="ma">{t("language.malayalam")}</option>
          <option value="ass">{t("language.assamese")}</option>
          <option value="maith">{t("language.maithili")}</option>
          <option value="be">{t("language.bengali")}</option>
          <option value="pa">{t("language.punjabi")}</option>
        </select>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition"
        >
          {t("language.back")}
        </button>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};

export default LanguageSettings;
