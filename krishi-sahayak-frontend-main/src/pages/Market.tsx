import { useState, useEffect } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext"; // ✅ hook for translations

export default function Market() {
  const { t } = useLanguage();

  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [selectedCommodity, setSelectedCommodity] = useState("Wheat");

  // --- Constants in ENGLISH (for API fetch only) ---
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const commodities = [
    "Wheat", "Rice", "Barley", "Maize", "Jowar", "Bajra", "Ragi", "Pulses",
    "Sugarcane", "Soybean", "Mustard", "Groundnut", "Cotton", "Jute", "Potato",
    "Onion", "Tomato", "Cabbage", "Cauliflower", "Peas", "Chillies",
    "Banana", "Mango", "Apple", "Orange", "Grapes"
  ];

  // --- Fetch Data ---
  useEffect(() => {
    if (selectedState && selectedCommodity) {
      fetch(
        `http://localhost:8081/api/market/${encodeURIComponent(
          selectedCommodity
        )}/${encodeURIComponent(selectedState)}`
      )
        .then((res) => res.json())
        .then((data) => setMarketPrices(data))
        .catch((err) => console.error("Error fetching data", err));
    }
  }, [selectedState, selectedCommodity]);

  // --- Price Helpers ---
  const getPriceChange = (current: number, previous: number) => {
    if (!previous) return { change: 0, percentage: 0 };
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage: parseFloat(percentage) };
  };

  const getPriceIcon = (change: number) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getPriceColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-green-800";
    return "text-gray-400";
  };

  // --- Dynamic Market Summary ---
  const summary = marketPrices.reduce(
    (acc, item) => {
      const priceChange = getPriceChange(item.modalPrice, item.minPrice);
      if (priceChange.change > 0) acc.increased++;
      else if (priceChange.change < 0) acc.decreased++;
      else acc.noChange++;
      return acc;
    },
    { increased: 0, decreased: 0, noChange: 0 }
  );

  // Persist last selected values
  localStorage.setItem("lastCommodity", selectedCommodity);
  localStorage.setItem("lastState", selectedState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">{t("market.title")}</h1>
        <p className="opacity-90">{t("market.subtitle")}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex gap-4">
          <select
            className="p-3 border border-green-200 rounded-xl shadow-sm flex-1 focus:ring-2 focus:ring-green-500"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {t(`states.${state}`) || state}
              </option>
            ))}
          </select>

          <select
            className="p-3 border border-green-200 rounded-xl shadow-sm flex-1 focus:ring-2 focus:ring-green-500"
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
          >
            {commodities.map((c) => (
              <option key={c} value={c}>
                {t(`commodities.${c}`) || c}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic KPI Summary */}
        <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              📊 {t("market.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/10 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-green-200">↗️ {summary.increased}</p>
              <p className="text-sm opacity-90">{t("market.increased") || "Price Increased"}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-green-100">↘️ {summary.decreased}</p>
              <p className="text-sm opacity-90">{t("market.decreased") || "Price Decreased"}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-white">→ {summary.noChange}</p>
              <p className="text-sm opacity-90">{t("market.nochange") || "No Change"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Price List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-green-700">{t("market.cropPrices") || "Crop Prices"}</h2>

          {marketPrices.length === 0 ? (
            <p className="text-gray-500">{t("market.nodata")}</p>
          ) : (
            marketPrices.map((item, index) => {
              const priceChange = getPriceChange(item.modalPrice, item.minPrice);
              const PriceIcon = getPriceIcon(priceChange.change);
              const priceColor = getPriceColor(priceChange.change);

              return (
                <Card
                  key={index}
                  className="border-2 border-green-100 shadow-sm hover:shadow-md transition"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {/* Highlight Location */}
                        <h3 className="font-bold text-lg text-green-700">
                          {item.market}, {item.district}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.commodity} • {item.variety}
                        </p>
                        <p className="text-xs text-gray-400">
                          {t("market.arrival")}: {item.arrivalDate}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xl font-bold text-green-700">
                              ₹{item.modalPrice.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {t("market.min")}: ₹{item.minPrice.toLocaleString()} | {t("market.max")}: ₹
                              {item.maxPrice.toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`flex items-center gap-1 ${priceColor}`}
                          >
                            <PriceIcon size={18} />
                            <span className="text-sm font-medium">
                              {priceChange.percentage !== 0 &&
                                `${priceChange.percentage}%`}
                            </span>
                          </div>
                        </div>

                        {priceChange.change !== 0 && (
                          <p className={`text-sm ${priceColor}`}>
                            {priceChange.change > 0 ? "+" : ""}₹
                            {priceChange.change}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
