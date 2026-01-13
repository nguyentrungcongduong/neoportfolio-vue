import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface NeoTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const NeoTextarea = forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("neo-input w-full min-h-[120px] resize-none", className)}
        {...props}
      />
    );
  }
);

NeoTextarea.displayName = "NeoTextarea";

export default NeoTextarea;
