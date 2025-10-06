import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FarmerInput } from "@/components/ui/farmer-input";
import { FarmerButton } from "@/components/ui/farmer-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/navigation/bottom-nav";

interface CropRecommendationData {
  recommendedCrop: string;
  reason: string;
  basedOnSoilData: boolean;
}

interface SoilData {
  fieldName: string;
  region: string;
  soilType: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
}

export default function CropRecommendation() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [fieldName, setFieldName] = useState("");
  const [recommendation, setRecommendation] = useState<CropRecommendationData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [checking, setChecking] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showSoilRedirect, setShowSoilRedirect] = useState(false);

  const fetchData = () => {
    setChecking(true);
    setShowSoilRedirect(false);

    // Fetch crop recommendation
    fetch(`http://localhost:8081/api/crops/recommend/${fieldName}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: CropRecommendationData) => {
        setRecommendation(data);
        setShowPlaceholder(false);
      })
      .catch(() => {
        setRecommendation(null);
        setShowPlaceholder(false);
      });

    // Fetch soil data
    fetch(`http://localhost:8081/api/soil/${fieldName}`)
      .then((res) => {
        if (!res.ok) throw new Error("No soil data");
        return res.json();
      })
      .then((data: SoilData) => {
        setSoilData(data);
      })
      .catch(() => {
        setSoilData(null);
        setShowSoilRedirect(true); // show button only if Enter pressed and no soil data
      })
      .finally(() => setChecking(false));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20 p-6">
      <div className="gradient-primary text-primary-foreground p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">{t("crop.title")}</h1>
        <p className="text-primary-foreground/80">{t("crop.subtitle")}</p>
      </div>

      {/* Field Name Input */}
      <Card className="border-2 mb-6">
        <CardHeader>
          <CardTitle>{t("crop.selectField")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FarmerInput
            label={t("crop.selectField")}
            placeholder={t("crop.selectField")}
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <FarmerButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleButtonClick}
            disabled={checking}
          >
            {checking ? "Checking..." : t("crop.recommendation")}
          </FarmerButton>
        </CardContent>
      </Card>

      {/* Soil Data Card */}
      {soilData && (
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle>{t("crop.soilData")}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {["soilType", "ph", "nitrogen", "phosphorus", "potassium", "moisture"].map((key) => (
              <div key={key} className="space-y-1">
                <p className="text-sm font-medium">{t(`soil.fields.${key}`)}</p>
                <p className="text-sm text-muted-foreground">{soilData[key as keyof SoilData]}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Crop Recommendation Card */}
      {recommendation ? (
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle>{t("crop.recommendedCrop")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{recommendation.recommendedCrop}</p>
            <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
          </CardContent>
        </Card>
      ) : fieldName && !checking ? (
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle>{t("crop.recommendedCrop")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">Ideal crop for your field</p>
          </CardContent>

          {showSoilRedirect && (
            <CardContent className="space-y-4">
              <FarmerButton
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => (window.location.href = "/soil")}
              >
                {t("crop.goToSoilPage")}
              </FarmerButton>
            </CardContent>
          )}
        </Card>
      ) : showPlaceholder ? (
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle>{t("crop.placeholderTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("crop.placeholderDescription")}</p>
          </CardContent>
        </Card>
      ) : null}

      <BottomNav />
    </div>
  );
}
