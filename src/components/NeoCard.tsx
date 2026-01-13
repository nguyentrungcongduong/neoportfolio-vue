import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "info";
}

const NeoCard = forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-card",
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      info: "bg-info",
    };

    return (
      <div
        ref={ref}
        className={cn("neo-card p-6", variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeoCard.displayName = "NeoCard";

export default NeoCard;
