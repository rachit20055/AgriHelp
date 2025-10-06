import { useState } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FarmerButton } from "@/components/ui/farmer-button";
import { FarmerInput } from "@/components/ui/farmer-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

// Hardcoded national schemes
const nationalSchemes = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description: "Provides income support of ₹6,000 per year to small and marginal farmers.",
    eligibility: "All small and marginal farmers owning up to 2 hectares of cultivable land.",
    benefits: "Direct Benefit Transfer of ₹2,000 every 4 months.",
    link: "https://pmkisan.gov.in/"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance scheme protecting farmers against yield losses.",
    eligibility: "All farmers growing notified crops.",
    benefits: "Covers yield loss due to natural calamities.",
    link: "https://pmfby.gov.in/"
  },
  {
    name: "Soil Health Card Scheme",
    description: "Promotes soil testing and balanced fertilizer usage.",
    eligibility: "All farmers across India.",
    benefits: "Personalized soil health reports & fertilizer advice.",
    link: "https://soilhealth.dac.gov.in/"
  }
];

// State-level schemes
const stateSchemes = {
  UP: [
    {
      name: "Kisan Durghatna Bima Yojana",
      description: "Insurance cover for accidental death/disability.",
      benefits: "Up to ₹5 lakh insurance cover.",
      link: "https://upagripardarshi.gov.in/"
    },
    {
      name: "UP Free Water Irrigation Scheme",
      description: "Free water for tube well irrigation.",
      benefits: "Free irrigation for all farmers.",
      link: "https://upagripardarshi.gov.in/"
    }
  ],
  Delhi: [
    {
      name: "Mukhya Mantri Kisan Aay Badhotri Yojana",
      description: "Lease land to govt for renewable energy projects.",
      benefits: "Fixed annual assured income.",
      link: "https://delhi.gov.in/"
    }
  ],
  Haryana: [
    {
      name: "Meri Fasal Mera Byora",
      description: "Unified crop registration & subsidy portal.",
      benefits: "Direct benefits & subsidies.",
      link: "https://fasal.haryana.gov.in/"
    },
    {
      name: "Bhavantar Bharpai Yojana",
      description: "Compensation when crops sold below MSP.",
      benefits: "Covers gap between MSP & market price.",
      link: "https://hortharyana.gov.in/"
    }
  ]
};

export default function Support() {
  const { t } = useLanguage(); // ✅ translations

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("support.chat.welcome"),
      sender: "support",
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  const [error, setError] = useState("");

  const validateMessage = (text: string) => {
    if (text.trim().length === 0) return t("support.chat.error.empty");
    if (text.length > 500) return t("support.chat.error.long");
    return "";
  };

  const handleSendMessage = () => {
    const validationError = validateMessage(message);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const userMessage: Message = {
      id: messages.length + 1,
      text: message.trim(),
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        text: t("support.chat.autoReply"),
        sender: "support",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">{t("support.title")}</h1>
        <p className="text-primary-foreground/80">{t("support.subtitle")}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Phone className="mx-auto mb-2 text-primary" size={24} />
              <h3 className="font-semibold">{t("support.contact.call")}</h3>
              <p className="text-sm text-muted-foreground">1800-XXX-XXXX</p>
            </CardContent>
          </Card>

          <Card className="border-2 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Mail className="mx-auto mb-2 text-primary" size={24} />
              <h3 className="font-semibold">{t("support.contact.email")}</h3>
              <p className="text-sm text-muted-foreground">help@krishishayak.in</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary bg-secondary/10">
            <CardContent className="p-4 text-center">
              <MessageCircle className="mx-auto mb-2 text-secondary" size={24} />
              <h3 className="font-semibold">{t("support.contact.chat")}</h3>
              <p className="text-sm text-muted-foreground">{t("support.contact.chatAvailable")}</p>
            </CardContent>
          </Card>
        </div>

        {/* National Schemes */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t("support.nationalSchemes.title")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {nationalSchemes.map((scheme, idx) => (
              <Card key={idx} className="border rounded-2xl shadow hover:shadow-md transition">
                <CardHeader>
                  <CardTitle>{scheme.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{scheme.description}</p>
                  <p className="text-sm"><strong>{t("support.labels.eligibility")}:</strong> {scheme.eligibility}</p>
                  <p className="text-sm"><strong>{t("support.labels.benefits")}:</strong> {scheme.benefits}</p>
                  <Button asChild variant="outline" className="mt-2 w-full">
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      {t("support.labels.visitSite")}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* State Schemes */}
        {Object.entries(stateSchemes).map(([state, schemes], idx) => (
          <Card key={idx} className="border-2">
            <CardHeader>
              <CardTitle>{t("support.stateSchemes.title", { state })}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {schemes.map((scheme, i) => (
                <Card key={i} className="border rounded-2xl shadow hover:shadow-md transition">
                  <CardHeader>
                    <CardTitle>{scheme.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                    <p className="text-sm"><strong>{t("support.labels.benefits")}:</strong> {scheme.benefits}</p>
                    {scheme.link && (
                      <Button asChild variant="outline" className="mt-2 w-full">
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                          {t("support.labels.visitSite")}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Chat Interface */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle size={24} />
              {t("support.chat.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto space-y-3 mb-4 p-2 bg-muted/30 rounded-lg">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <FarmerInput
                placeholder={t("support.chat.placeholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={error}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <FarmerButton variant="primary" size="lg" className="w-full" onClick={handleSendMessage}>
                <Send size={20} className="mr-2" />
                {t("support.chat.send")}
              </FarmerButton>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
