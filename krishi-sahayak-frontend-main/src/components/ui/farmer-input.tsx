import { Input } from "./input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FarmerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const FarmerInput = forwardRef<HTMLInputElement, FarmerInputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-lg font-semibold text-foreground">
            {label}
          </label>
        )}
        <Input
          className={cn(
            "h-14 text-lg px-4 border-2 rounded-lg",
            "focus:ring-2 focus:ring-primary focus:border-primary",
            error && "border-destructive focus:ring-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FarmerInput.displayName = "FarmerInput";

export { FarmerInput };