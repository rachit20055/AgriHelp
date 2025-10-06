import { useNavigate } from "react-router-dom";
import { Cloud, BookOpen, TrendingUp, MessageCircle, Droplets, Languages, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { title: t("home.quickActions.weather"), icon: Cloud, path: "/weather" },
    { title: t("home.quickActions.recommendation"), icon: BookOpen, path: "/recommendation" },
    { title: t("home.quickActions.market"), icon: TrendingUp, path: "/market" },
    { title: t("home.quickActions.support"), icon: MessageCircle, path: "/support" },
    { title: t("home.quickActions.soil"), icon: Droplets, path: "/soil" },
    { title: t("home.quickActions.language"), icon: Languages, path: "/language" },
    { title: t("home.quickActions.dashboard"), icon: User, path: "/dashboard" }, // new
  ];

  const itemWidth = `${100 / navItems.length}%`; // dynamically resize to fit all

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner flex">
      {navItems.map((item) => (
        <button
          key={item.path}
          style={{ width: itemWidth }}
          className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:text-green-600"
          onClick={() => navigate(item.path)}
        >
          <item.icon size={20} />
          <span className="truncate">{item.title}</span>
        </button>
      ))}
    </div>
  );
};
