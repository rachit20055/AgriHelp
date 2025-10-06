import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FarmerCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary" | "secondary";
}

export function FarmerCard({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  className,
  variant = "default"
}: FarmerCardProps) {
  const variantStyles = {
    default: "bg-card hover:bg-muted/50 border-border",
    primary: "gradient-primary text-primary-foreground border-primary",
    secondary: "gradient-secondary text-secondary-foreground border-secondary"
  };

  return (
    <Card 
      className={cn(
        "touch-target cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <Icon size={48} className="mb-2" />
          <h3 className="text-xl font-bold">{title}</h3>
          {description && (
            <p className="text-sm opacity-80">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}