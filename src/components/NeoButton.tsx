import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "info" | "outline";
  size?: "sm" | "md" | "lg";
}

const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variantClasses = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      info: "bg-info",
      outline: "bg-background",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "neo-button",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeoButton.displayName = "NeoButton";

export default NeoButton;
