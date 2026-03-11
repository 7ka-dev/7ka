import { useState, useRef, useCallback, useEffect } from "react";

interface UseTerminalInputOptions {
  onSubmit: (command: string) => void;
  enabled: boolean;
}

interface UseTerminalInputResult {
  input: string;
}

export function useTerminalInput({
  onSubmit,
  enabled,
}: UseTerminalInputOptions): UseTerminalInputResult {
  const [input, setInput] = useState("");
  const inputRef = useRef(input);

  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        const trimmed = inputRef.current.trim();
        if (trimmed.length > 0) {
          onSubmit(trimmed);
        }
        setInput("");
        return;
      }

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setInput((prev) => prev + e.key);
      }
    },
    [onSubmit],
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("keydown", handleKeyDown);
    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleKeyDown]);

  return { input };
}
