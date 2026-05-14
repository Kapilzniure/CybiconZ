import { useEffect, useState } from "react";

const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useScramble(value: string, trigger: boolean, duration = 600) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!trigger) {
      setDisplayValue(value);
      return;
    }

    if (!value) {
      setDisplayValue(value);
      return;
    }

    const length = value.length;
    const startTime = performance.now();
    let frameId: number;

    function getRandomChar() {
      return ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)];
    }

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const nextValue = [...value].map((char, index) => {
        if (char === " ") return " ";

        const settleTime = ((index + 1) / length) * duration;
        if (elapsed >= settleTime || progress >= 1) return char;

        return getRandomChar();
      });

      setDisplayValue(nextValue.join(""));

      if (elapsed < duration) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    }

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, value, duration]);

  return displayValue;
}
