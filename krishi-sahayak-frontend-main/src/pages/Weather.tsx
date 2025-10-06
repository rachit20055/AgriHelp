import { useEffect, useState } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cloud,
  CloudRain,
  Sun,
  Thermometer,
  Droplets,
  CloudSnow,
  CloudLightning,
  Wind,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext"; // ✅ FIXED import



// ✅ Fallback weather data pool
const fallbackWeatherPool = [
  {
    city: "Greater Noida",
    temperature: 28,
    humidity: 45,
    windSpeed: 10,
    condition: "Sunny",
  },
  {
    city: "Noida",
    temperature: 25,
    humidity: 55,
    windSpeed: 8,
    condition: "Cloudy",
  },
  {
    city: "Delhi",
    temperature: 30,
    humidity: 40,
    windSpeed: 12,
    condition: "Partly Cloudy",
  },
  {
    city: "Delhi NCR",
    temperature: 27,
    humidity: 60,
    windSpeed: 6,
    condition: "Hazy",
  },
];

export default function Weather() {
  const { t } = useLanguage(); // ✅ translation hook
  const [city, setCity] = useState("Greater Noida");
  const [cityInput, setCityInput] = useState("Greater Noida");
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = (selectedCity: string) => {
    setLoading(true);
    setError(false);

    fetch(`http://localhost:8081/api/weather/${selectedCity}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data.condition === "Unavailable") {
          throw new Error("Unavailable from API");
        }
        setCurrentWeather(data);
        setLoading(false);
      })
      .catch(() => {
        console.warn("⚠️ Weather API failed, using fallback data...");
        setError(true);

        const fallback = fallbackWeatherPool.find(
          (f) => f.city.toLowerCase() === selectedCity.toLowerCase()
        );

        if (fallback) {
          const randomFallback =
            fallbackWeatherPool[
              Math.floor(Math.random() * fallbackWeatherPool.length)
            ];
          setCurrentWeather(randomFallback);
        } else {
          setCurrentWeather(null);
        }

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-warning bg-warning/10";
      case "medium":
        return "border-secondary bg-secondary/10";
      default:
        return "border-success bg-success/10";
    }
  };

  // Dynamic Alerts
  const weatherAlerts: any[] = [];
  if (currentWeather?.condition?.toLowerCase().includes("rain")) {
    weatherAlerts.push({
      id: 1,
      type: "warning",
      title: t("weather.alerts.heavyRain.title"),
      message: t("weather.alerts.heavyRain.message"),
      icon: CloudRain,
      severity: "high",
    });
  }
  if (currentWeather?.windSpeed && currentWeather.windSpeed > 25) {
    weatherAlerts.push({
      id: 3,
      type: "warning",
      title: t("weather.alerts.strongWinds.title"),
      message: t("weather.alerts.strongWinds.message", {
        speed: currentWeather.windSpeed,
      }),
      icon: Wind,
      severity: "high",
    });
  }
  if (weatherAlerts.length === 0 && currentWeather) {
    weatherAlerts.push({
      id: 2,
      type: "info",
      title: t("weather.alerts.good.title"),
      message: t("weather.alerts.good.message"),
      icon: Sun,
      severity: "low",
    });
  }

  if (loading) {
    return <div className="p-6">{t("loading")}</div>;
  }

  const forecast = [
    { day: "Mon", temp: 26, icon: Sun },
    { day: "Tue", temp: 24, icon: Cloud },
    { day: "Wed", temp: 22, icon: CloudRain },
    { day: "Thu", temp: 21, icon: CloudLightning },
    { day: "Fri", temp: 20, icon: CloudSnow },
    { day: "Sat", temp: 27, icon: Sun },
    { day: "Sun", temp: 25, icon: Cloud },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">{t("weather.headerTitle")}</h1>
        <p className="text-primary-foreground/80">
          {t("weather.headerSubtitle")}
        </p>
      </div>


      {/* Search Bar */}
      <div className="p-6 flex gap-2">
        <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setCity(cityInput);
            }}
            placeholder={t("weather.enterCity")}  // ✅ dynamic
            className="flex-1 px-3 py-2 rounded border text-black"
          />

        <button
          onClick={() => setCity(cityInput)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          {t("weather.search.button")}
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Error State */}
        {error && !currentWeather ? (
          <Card className="border-2 border-red-500 bg-red-100">
            <CardContent className="p-4 text-center text-red-700 font-bold">
              {t("weather.error.unavailable", { city })}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Current Weather */}
            {currentWeather && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud size={24} />
                    {t("weather.current.title", {
                      city: currentWeather.city || city,
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Thermometer
                        className="mx-auto mb-2 text-primary"
                        size={32}
                      />
                      <p className="text-2xl font-bold">
                        {currentWeather.temperature}°C
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("weather.current.temperature")}
                      </p>
                    </div>
                    <div className="text-center">
                      <Droplets
                        className="mx-auto mb-2 text-primary"
                        size={32}
                      />
                      <p className="text-2xl font-bold">
                        {currentWeather.humidity}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("weather.current.humidity")}
                      </p>
                    </div>
                    <div className="text-center">
                      <Wind className="mx-auto mb-2 text-primary" size={32} />
                      <p className="text-2xl font-bold">
                        {currentWeather.windSpeed || "N/A"} km/h
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("weather.current.wind")}
                      </p>
                    </div>
                    <div className="text-center">
                      <Cloud className="mx-auto mb-2 text-primary" size={32} />
                      <p className="text-lg font-bold">
                        {currentWeather.condition}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("weather.current.condition")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Weather Alerts */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{t("weather.alerts.title")}</h2>
              {weatherAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-2 ${getSeverityColor(alert.severity)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <alert.icon size={24} className="mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 7-Day Forecast */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("weather.forecast.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {forecast.map((dayData) => (
                    <div key={dayData.day} className="p-2">
                      <p className="text-sm font-medium">{dayData.day}</p>
                      <dayData.icon
                        size={20}
                        className="mx-auto my-2 text-secondary"
                      />
                      <p className="text-sm">{dayData.temp}°</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
