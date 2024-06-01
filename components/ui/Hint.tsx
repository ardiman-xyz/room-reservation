import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import React from "react";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={1}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="text-xs max-w-[220px] break-words bg-black text-white"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
