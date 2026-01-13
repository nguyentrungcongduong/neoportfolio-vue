import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface NeoBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "info" | "outline";
}

const NeoBadge = forwardRef<HTMLSpanElement, NeoBadgeProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const variantClasses = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      info: "bg-info",
      outline: "bg-background",
    };

    return (
      <span
        ref={ref}
        className={cn("neo-badge", variantClasses[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

NeoBadge.displayName = "NeoBadge";

export default NeoBadge;
