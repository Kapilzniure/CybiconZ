import React from "react";

interface ProjectImagePlaceholderProps {
  projectName: string;
  serviceColor: string;
  className?: string;
}

export function ProjectImagePlaceholder({ projectName, serviceColor, className = "" }: ProjectImagePlaceholderProps) {
  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${serviceColor} 0%, #080810 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 35%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ color: "rgba(255,255,255,0.9)" }}
      >
        <div className="font-display font-bold" style={{ fontSize: "clamp(24px, 4vw, 38px)", letterSpacing: "-0.03em" }}>
          {projectName}
        </div>
        <div className="mt-3 text-[13px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.55)" }}>
          Photo coming soon
        </div>
      </div>
    </div>
  );
}
