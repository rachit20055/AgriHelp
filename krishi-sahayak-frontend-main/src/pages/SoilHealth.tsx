import { useState, useEffect } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmerInput } from "@/components/ui/farmer-input";
import { FarmerButton } from "@/components/ui/farmer-button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface SoilData {
  id?: string;
  fieldName: string;
  region: string;
  soilType: string;
  ph: number | "";
  nitrogen: number | "";
  phosphorus: number | "";
  potassium: number | "";
  moisture: number | "";
}

export default function SoilHealth() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [soilData, setSoilData] = useState<SoilData>({
    fieldName: "",
    region: "",
    soilType: "",
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    moisture: "",
  });

  const [previousData, setPreviousData] = useState<SoilData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch previously saved soil data from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/soil/all")
      .then((res) => res.json())
      .then((data: SoilData[]) => {
        const filtered = data.filter(
          (d) =>
            d.fieldName &&
            d.region &&
            d.soilType &&
            d.ph != null &&
            d.nitrogen != null &&
            d.phosphorus != null &&
            d.potassium != null &&
            d.moisture != null
        );
        setPreviousData(filtered);
        setLoading(false);
      })
      .catch(() => {
        setPreviousData([]);
        setLoading(false);
      });
  }, []);

  const handleChange = (field: keyof SoilData, value: string) => {
    setSoilData((prev) => ({
      ...prev,
      [field]:
        value === ""
          ? ""
          : ["fieldName", "region", "soilType"].includes(field)
          ? value
          : Number(value),
    }));
  };

  const handleSave = () => {
    for (const key of Object.keys(soilData) as (keyof SoilData)[]) {
      if (soilData[key] === "" || soilData[key] === null) {
        toast({
          title: t("soil.toast.errorTitle"),
          description: `${t("soil.toast.errorDescription")} ${t(
            `soil.fields.${key}`
          )}`,
        });
        return;
      }
    }

    fetch("http://localhost:8081/api/soil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(soilData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
      })
      .then((saved: SoilData) => {
        toast({
          title: t("soil.toast.successTitle"),
          description: t("soil.toast.successDescription"),
        });
        setPreviousData((prev) => {
          const idx = prev.findIndex(
            (d) =>
              d.fieldName.toLowerCase() === saved.fieldName.toLowerCase() &&
              d.region.toLowerCase() === saved.region.toLowerCase()
          );
          if (idx >= 0) {
            prev[idx] = saved;
            return [...prev];
          }
          return [saved, ...prev];
        });
        setSoilData({
          fieldName: "",
          region: "",
          soilType: "",
          ph: "",
          nitrogen: "",
          phosphorus: "",
          potassium: "",
          moisture: "",
        });
      })
      .catch(() => {
        toast({
          title: t("soil.toast.errorTitle"),
          description: t("soil.toast.errorDescription"),
        });
      });
  };

  // ✅ New: Delete soil data
  const handleDelete = (id: string) => {
    if (!window.confirm(t("soil.toast.confirmDelete"))) return;

    fetch(`http://localhost:8081/api/soil/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        toast({
          title: t("soil.toast.successTitle"),
          description: t("soil.toast.deleteSuccess"),
        });
        setPreviousData((prev) => prev.filter((d) => d.id !== id));
      })
      .catch(() => {
        toast({
          title: t("soil.toast.errorTitle"),
          description: t("soil.toast.errorDelete"),
        });
      });
  };

  if (loading) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      <div className="gradient-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">{t("soil.title.title")}</h1>
        <p className="text-primary-foreground/80">{t("soil.title.subtitle")}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t("soil.input.title")}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("soil.fields.fieldName")}</p>
              <FarmerInput
                placeholder={t("soil.fields.fieldName_placeholder")}
                value={soilData.fieldName}
                onChange={(e) => handleChange("fieldName", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("soil.fields.region")}</p>
              <FarmerInput
                placeholder={t("soil.fields.region_placeholder")}
                value={soilData.region}
                onChange={(e) => handleChange("region", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("soil.fields.soilType")}</p>
              <select
                value={soilData.soilType}
                onChange={(e) => handleChange("soilType", e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="">
                  {t("soil.fields.soilType_placeholder")}
                </option>
                <option value="Sandy">{t("soil.types.sandy")}</option>
                <option value="Loamy">{t("soil.types.loamy")}</option>
                <option value="Clay">{t("soil.types.clay")}</option>
              </select>
            </div>

            {(Object.keys(soilData) as (keyof SoilData)[])
              .filter((k) => !["fieldName", "region", "soilType"].includes(k))
              .map((key) => (
                <div key={key} className="space-y-1">
                  <p className="text-sm font-medium">
                    {t(`soil.fields.${key}`)}
                  </p>
                  <FarmerInput
                    placeholder={t(`soil.fields.${key}_placeholder`)}
                    type="number"
                    value={soilData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}
          </CardContent>
          <div className="p-4">
            {/* ✅ SHC Info Note (moved above save button, styled clearly) */}
            <div className="mb-3 text-sm text-center font-medium bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-2">
              {t("soil.shc.note")}{" "}
              <a
                href="https://soilhealth.dac.gov.in/soilhealthcard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-semibold"
              >
                {t("soil.shc.linkText")}
              </a>
            </div>

            <FarmerButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSave}
            >
              {t("soil.input.saveButton")}
            </FarmerButton>
          </div>

        </Card>

        {/* Previous Data */}
        {previousData.length > 0 && (
          <div className="space-y-4">
            {previousData.map((data, idx) => (
              <Card key={idx} className="border-2 relative">
                <CardHeader>
                  <CardTitle>
                    {data.fieldName} - {data.region}
                  </CardTitle>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(data.id!)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    {t("soil.delete")}
                  </button>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  {[
                    "soilType",
                    "ph",
                    "nitrogen",
                    "phosphorus",
                    "potassium",
                    "moisture",
                  ].map((key) => (
                    <div key={key} className="space-y-1">
                      <p className="text-sm font-medium">
                        {t(`soil.fields.${key}`)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {data[key as keyof SoilData]}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
