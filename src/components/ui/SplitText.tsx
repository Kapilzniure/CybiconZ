import { Fragment, useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SplitTextProps {
  as?: ElementType;
  children: string;
  className?: string;
  style?: React.CSSProperties;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  /** Fire on mount instead of scroll-trigger (use for above-fold hero headings) */
  onMount?: boolean;
}

export default function SplitText({
  as: Tag = "span",
  children,
  className,
  style,
  innerClassName,
  innerStyle,
  delay = 0,
  stagger = 0.06,
  onMount = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = String(children).split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const inners = ref.current?.querySelectorAll<HTMLElement>(".st-i");
      if (!inners?.length) return;

      const to: gsap.TweenVars = {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        delay,
      };

      if (onMount) {
        gsap.fromTo(inners, { yPercent: 115 }, to);
      } else {
        gsap.fromTo(inners, { yPercent: 115 }, {
          ...to,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    },
    { scope: ref }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span
              className={`st-i${innerClassName ? ` ${innerClassName}` : ""}`}
              style={{ display: "inline-block", ...innerStyle }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
