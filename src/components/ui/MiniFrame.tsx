import { ReactNode } from "react";

interface MiniFrameProps {
  children: ReactNode;
}

export function MiniFrame({ children }: MiniFrameProps) {
  return (
    <div className="rounded-[10px] overflow-hidden border border-white/[0.08] bg-[#0A0A12] flex flex-col h-full">
      {/* Mini top strip */}
      <div className="h-[20px] bg-[#1A1A2E] flex items-center px-3 flex-shrink-0">
        <div className="flex gap-1">
          <div className="w-[4px] h-[4px] rounded-full bg-[#FF5F57]" />
          <div className="w-[4px] h-[4px] rounded-full bg-[#FEBC2E]" />
          <div className="w-[4px] h-[4px] rounded-full bg-[#28C840]" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
