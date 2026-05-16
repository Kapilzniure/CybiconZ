import { ReactNode } from "react";

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
  accentColor?: string;
}

export function BrowserFrame({ url, children, accentColor }: BrowserFrameProps) {
  return (
    <div className="group/browser rounded-[10px] overflow-hidden border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] bg-[#0A0A12] relative">
      {/* Top Strip */}
      <div 
        className="h-[28px] bg-[#1A1A2E] flex items-center px-4 relative z-20"
        style={{ borderTop: accentColor ? `2px solid ${accentColor}` : undefined }}
      >
        {/* macOS style dots */}
        <div className="flex gap-1.5">
          <div className="w-[6px] h-[6px] rounded-full bg-[#FF5F57]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#FEBC2E]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#28C840]" />
        </div>
        
        {/* URL bar */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[45%] h-[16px] bg-white/[0.05] rounded-[4px] flex items-center justify-center px-3 overflow-hidden">
          <span className="font-mono text-[10px] text-white/35 truncate">
            {url}
          </span>
        </div>
      </div>
      
      {/* Content area */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
