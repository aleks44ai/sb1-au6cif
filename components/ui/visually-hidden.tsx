"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const VisuallyHidden = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};