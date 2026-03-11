import type { JSX } from "react";

const BOOT_LINES = [
  { text: "BIOS v1.07 — POST CHECK...", status: "OK" },
  { text: "LOADING KERNEL...", status: "OK" },
  { text: "MOUNTING FILESYSTEMS...", status: "OK" },
  { text: "STARTING NETWORK...", status: "WARN", warn: "SEVERAL OPEN PORTS" },
  {
    text: "SCANNING FOR THREATS...",
    status: "FOUND",
    warn: "1 FOUND (that's you)",
  },
  { text: "──────────────────────────────────────────", status: null },
  { text: "Welcome to 7ka.dev public gateway.", status: null },
  { text: "We know you're there. Type help if lost.", status: null },
  { text: "──────────────────────────────────────────", status: null },
];

const ASCII_LOGO = `  
 ████████╗██╗  ██╗ █████╗      ██████╗ ███████╗██╗   ██╗
     ███╔╝██║ ██╔╝██╔══██╗     ██╔══██╗██╔════╝██║   ██║
    ███╔╝ █████╔╝ ███████║     ██║  ██║█████╗  ██║   ██║
   ███╔╝  ██╔═██╗ ██╔══██║     ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ███╔╝   ██║  ██╗██║  ██║ ██╗ ██████╔╝███████╗ ╚████╔╝ 
 ╚═══╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═╝ ╚═════╝ ╚══════╝  ╚═══╝ `;

export function TerminalPage(): JSX.Element {
  return (
    <div
      className="fixed inset-0 flex flex-col p-8 overflow-hidden font-mono"
      style={{ background: "#080a08", color: "#39ff14" }}
    >
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Top meta */}
      <div
        className="text-[0.58rem] tracking-[0.2em] uppercase mb-5"
        style={{ color: "#0a3d00" }}
      >
        <span style={{ color: "#1a8c00" }}>NODE:</span> 7KA-GATEWAY
        &nbsp;|&nbsp;
        <span style={{ color: "#1a8c00" }}>UPTIME:</span> classified
        &nbsp;|&nbsp;
        <span style={{ color: "#1a8c00" }}>LOCATION:</span>{" "}
        <span
          className="rounded-sm px-0.5 select-none"
          style={{ background: "#0a3d00", color: "#0a3d00" }}
        >
          REDACTED
        </span>
      </div>

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
        {BOOT_LINES.map((line, i) => (
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

      {/* Input line */}
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
    </div>
  );
}
