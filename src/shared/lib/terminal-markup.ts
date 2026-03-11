export interface TerminalLine {
  id: number;
  html: string;
  isCommand: boolean;
}

let lineId = 0;

export function makeLine(text: string, isCommand = false): TerminalLine {
  return { id: lineId++, html: parseMarkup(text), isCommand };
}

export function parseMarkup(text: string): string {
  return text
    .replace(/<g>(.*?)<\/g>/g, '<span style="color:#39ff14">$1</span>')
    .replace(/<d>(.*?)<\/d>/g, '<span style="color:#1a8c00">$1</span>')
    .replace(/<m>(.*?)<\/m>/g, '<span style="color:#0a3d00">$1</span>')
    .replace(/<w>(.*?)<\/w>/g, '<span style="color:#ffb300">$1</span>')
    .replace(/<e>(.*?)<\/e>/g, '<span style="color:#cc4400">$1</span>')
    .replace(
      /<r>(.*?)<\/r>/g,
      '<span style="background:#1a8c00;color:#1a8c00;border-radius:2px;padding:0 2px;user-select:none">$1</span>',
    );
}
