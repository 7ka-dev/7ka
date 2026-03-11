import type { JSX } from "react";

import { useBootSequence } from "@/features/terminal-boot";
import { ASCII_LOGO } from "@/shared/config";
import { ScanLines } from "@/shared/ui/scanlines";
import { TerminalMetaBar } from "@/shared/ui/terminal-meta-bar";
import { Vignette } from "@/shared/ui/vignette";

export function TerminalScreen(): JSX.Element {
  const { visibleLines, isDone } = useBootSequence();

  return (
    <div
      className="fixed inset-0 flex flex-col p-8 overflow-hidden font-mono"
      style={{ background: "#080a08", color: "#39ff14" }}
    >
      <ScanLines />
      <Vignette />
      <TerminalMetaBar />

      {/* ASCII Logo */}
      <pre
        className="leading-snug mb-6 whitespace-pre select-none"
        style={{
          fontSize: "clamp(0.36rem, 0.95vw, 0.72rem)",
          color: "#1a8c00",
          textShadow: "0 0 8px rgba(57,255,20,0.15)",
        }}
      >
        {ASCII_LOGO}
      </pre>

      {/* Boot lines */}
      <div className="flex-1 overflow-hidden pb-4">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className="leading-loose tracking-[0.04em]"
            style={{
              fontSize: "clamp(0.6rem, 1.05vw, 0.8rem)",
              color: "#39ff14",
              textShadow: "0 0 6px rgba(57,255,20,0.3)",
            }}
          >
            {line.status === null ? (
              <span>{line.text}</span>
            ) : (
              <>
                <span>{line.text} </span>
                {line.status === "OK" && (
                  <span
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 6px rgba(57,255,20,0.5)",
                    }}
                  >
                    OK
                  </span>
                )}
                {(line.status === "WARN" || line.status === "FOUND") && (
                  <span
                    style={{
                      color: "#ffb300",
                      textShadow: "0 0 8px rgba(255,179,0,0.4)",
                    }}
                  >
                    {line.warn}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Input line — shown only after boot completes */}
      {isDone && (
        <div
          className="flex items-center gap-2 pt-2 border-t"
          style={{
            fontSize: "clamp(0.6rem, 1.05vw, 0.8rem)",
            borderColor: "#0a3d00",
            color: "#39ff14",
            textShadow: "0 0 6px rgba(57,255,20,0.3)",
          }}
        >
          <span className="whitespace-nowrap">guest@7ka.dev:~$</span>
          <span
            className="inline-block w-[0.55em] h-[1em] align-middle animate-pulse"
            style={{
              background: "#39ff14",
              boxShadow: "0 0 6px rgba(57,255,20,0.8)",
            }}
          />
        </div>
      )}
    </div>
  );
}
