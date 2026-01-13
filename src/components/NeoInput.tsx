import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface NeoInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("neo-input w-full", className)}
        {...props}
      />
    );
  }
);

NeoInput.displayName = "NeoInput";

export default NeoInput;
