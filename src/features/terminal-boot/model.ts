import { useState, useEffect } from "react";

import type { BootLine } from "@/entities/terminal";
import { BOOT_LINES } from "@/shared/config";

const LINE_DELAY_MS = 120;
const INITIAL_DELAY_MS = 400;

interface UseBootSequenceResult {
  visibleLines: BootLine[];
  isDone: boolean;
}

export function useBootSequence(): UseBootSequenceResult {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= BOOT_LINES.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, LINE_DELAY_MS);

      return (): void => {
        clearInterval(interval);
      };
    }, INITIAL_DELAY_MS);

    return (): void => {
      clearTimeout(initialTimer);
    };
  }, []);

  return {
    visibleLines: BOOT_LINES.slice(0, visibleCount),
    isDone: visibleCount >= BOOT_LINES.length,
  };
}
