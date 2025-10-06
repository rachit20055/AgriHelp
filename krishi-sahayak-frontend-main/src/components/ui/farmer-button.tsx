import { Button } from "./button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FarmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "xl";
  children: React.ReactNode;
}

const FarmerButton = forwardRef<HTMLButtonElement, FarmerButtonProps>(
  ({ className, variant = "default", size = "lg", children, ...props }, ref) => {
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-14 rounded-lg px-8 text-lg",
      xl: "h-16 rounded-xl px-10 text-xl"
    };

    return (
      <Button
        className={cn(
          "touch-target font-semibold transition-all duration-200",
          sizeStyles[size],
          className
        )}
        variant={variant}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

FarmerButton.displayName = "FarmerButton";

export { FarmerButton };