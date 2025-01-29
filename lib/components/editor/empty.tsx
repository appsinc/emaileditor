import { cn } from "@/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icons?: LucideIcon[];
  cta?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icons = [],
  cta,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "text-center",
        "py-5 w-full max-w-[620px]",
        "group transition duration-500 hover:duration-200",
        className,
      )}
    >
      <div className="flex justify-center isolate">
        {icons.length === 3 ? (
          <>
            <div className="bg-background size-10 grid place-items-center rounded-xl relative left-2.5 top-1.5 -rotate-6 shadow-lg ring-1 ring-border group-hover:-translate-x-5 group-hover:-rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[0], {
                className: "w-6 h-6 text-zinc-500",
              })}
            </div>
            <div className="bg-background size-10 grid place-items-center rounded-xl relative z-10 shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[1], {
                className: "w-6 h-6 text-zinc-500",
              })}
            </div>
            <div className="bg-background size-10 grid place-items-center rounded-xl relative right-2.5 top-1.5 rotate-6 shadow-lg ring-1 ring-border group-hover:translate-x-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[2], {
                className: "w-6 h-6 text-zinc-500",
              })}
            </div>
          </>
        ) : (
          <div className="bg-background size-10 grid place-items-center rounded-xl shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
            {icons[0] &&
              React.createElement(icons[0], {
                className: "w-6 h-6 text-zinc-500",
              })}
          </div>
        )}
      </div>
      <h2 className="text-foreground font-medium mt-6">{title}</h2>
      <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">
        {description}
      </p>
      {cta}
    </div>
  );
};
