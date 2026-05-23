import { useEffect, useState } from "react";

const SRC = "/music.m4a";

let audio: HTMLAudioElement | null = null;
const listeners = new Set<(playing: boolean) => void>();

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = document.createElement("audio");
    audio.loop = true;
    audio.volume = 0.45;
    // Explicit type so Chrome doesn't reject before even fetching
    const source = document.createElement("source");
    source.src = SRC;
    source.type = "audio/mp4";
    audio.appendChild(source);
  }
  return audio;
}

function notify(playing: boolean) {
  listeners.forEach((fn) => fn(playing));
}

export function useMusic() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    listeners.add(setPlaying);
    return () => { listeners.delete(setPlaying); };
  }, []);

  function toggle() {
    const a = getAudio();
    if (a.paused) {
      // Notify immediately so the UI updates and prevents a race double-click
      notify(true);
      a.play().catch((err: Error) => {
        if (err.name === "AbortError") return; // harmless play/pause race
        console.error("[useMusic] play() failed:", err);
        notify(false); // revert UI on real failure
      });
    } else {
      a.pause();
      notify(false);
    }
  }

  return { playing, toggle };
}
