/* Style note: Share cards extend the Cyber Zhouyi Neo-Orientalism system into a portable artifact: rice paper, ink, fine gold rules, and calm editorial metadata. */
import type { Locale } from "../contexts/LocaleContext";
import type { DivinationResult, HexagramProfile } from "./zhouyi";

export type ShareCardTheme = "light" | "dark";

const palette = {
  light: { bg: "#f7f1e7", panel: "#fffdf8", ink: "#201a14", muted: "#756b5d", accent: "#8c6239", rule: "#cdbda6", gold: "#9b7528" },
  dark: { bg: "#11100e", panel: "#1b1814", ink: "#f3e8d4", muted: "#b7a994", accent: "#c49a4f", rule: "#5b4d39", gold: "#d4af37" },
};

const cardCopy = {
  "zh-TW": { title: "一個正在變化的問題", primary: "本卦", relating: "變卦", direction: "今日指引", footer: "整理問題 · 觀看變化 · 找到下一步", note: "反思與決策整理工具，不構成預言或專業建議" },
  "zh-CN": { title: "一个正在变化的问题", primary: "本卦", relating: "变卦", direction: "今日指引", footer: "整理问题 · 观看变化 · 找到下一步", note: "反思与决策整理工具，不构成预言或专业建议" },
  en: { title: "A question in motion", primary: "PRIMARY", relating: "RELATING", direction: "A DIRECTION FOR TODAY", footer: "FRAME THE QUESTION · WATCH THE CHANGE · FIND THE NEXT MOVE", note: "A reflective decision tool, not a prediction or professional advice" },
} as const;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawWrappedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 4) {
  const chars = Array.from(text);
  const lines: string[] = [];
  let current = "";
  for (const char of chars) {
    const next = current + char;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else current = next;
  }
  if (current) lines.push(current);
  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines && visible.length) visible[visible.length - 1] = `${visible[visible.length - 1].slice(0, -1)}…`;
  visible.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return y + visible.length * lineHeight;
}

function drawHexagram(ctx: CanvasRenderingContext2D, lines: DivinationResult["lines"], x: number, y: number, width: number, theme: ShareCardTheme, changing: boolean) {
  const colors = palette[theme];
  const lineGap = 34;
  const lineHeight = 10;
  lines.slice().reverse().forEach((line, index) => {
    const top = y + index * lineGap;
    ctx.fillStyle = colors.ink;
    if (line.yin) {
      ctx.fillRect(x, top, width * 0.43, lineHeight);
      ctx.fillRect(x + width * 0.57, top, width * 0.43, lineHeight);
    } else ctx.fillRect(x, top, width, lineHeight);
    if (changing && line.changing) {
      ctx.beginPath();
      ctx.arc(x + width + 23, top + lineHeight / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = colors.gold;
      ctx.fill();
    }
  });
}

function drawOrnament(ctx: CanvasRenderingContext2D, colors: typeof palette.light) {
  ctx.strokeStyle = colors.rule;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(1010, 160, 120, 0, Math.PI * 2);
  ctx.arc(1010, 160, 84, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(885, 160);
  ctx.lineTo(1135, 160);
  ctx.moveTo(1010, 35);
  ctx.lineTo(1010, 285);
  ctx.stroke();
  for (let i = 0; i < 6; i += 1) {
    ctx.fillStyle = i % 2 ? colors.ink : colors.rule;
    ctx.fillRect(900 + i * 30, 130, 20, 3);
  }
}

export async function createShareCard(result: DivinationResult, primary: HexagramProfile, relating: HexagramProfile, locale: Locale, theme: ShareCardTheme): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  const colors = palette[theme];
  const copy = cardCopy[locale];

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = colors.panel;
  ctx.fillRect(48, 48, canvas.width - 96, canvas.height - 96);
  ctx.strokeStyle = colors.rule;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);
  drawOrnament(ctx, colors);

  ctx.fillStyle = colors.accent;
  ctx.font = "600 18px 'Noto Sans TC', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("CYBER ZHOUYI", 96, 118);
  ctx.fillStyle = colors.muted;
  ctx.font = "500 14px 'Noto Sans TC', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(`${new Date(result.createdAt).toLocaleDateString(locale)}  ·  64 / ${String(primary.id).padStart(2, "0")}`, 96, 151);

  ctx.fillStyle = colors.ink;
  ctx.font = "600 54px 'Noto Serif TC', serif";
  ctx.letterSpacing = "0px";
  ctx.fillText(copy.title, 96, 255);
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(96, 287);
  ctx.lineTo(232, 287);
  ctx.stroke();

  ctx.fillStyle = colors.muted;
  ctx.font = "500 22px 'Noto Sans TC', sans-serif";
  const questionBottom = drawWrappedText(ctx, result.question, 96, 350, 940, 38, 4);

  const cardTop = Math.max(questionBottom + 64, 535);
  ctx.fillStyle = colors.bg;
  roundRect(ctx, 96, cardTop, 1008, 270, 8);
  ctx.fill();
  ctx.strokeStyle = colors.rule;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = colors.accent;
  ctx.font = "600 15px 'Noto Sans TC', sans-serif";
  ctx.fillText(copy.primary, 140, cardTop + 48);
  ctx.fillStyle = colors.ink;
  ctx.font = "600 34px 'Noto Serif TC', serif";
  ctx.fillText(primary.names[locale], 140, cardTop + 88);
  ctx.fillStyle = colors.muted;
  ctx.font = "500 16px 'Noto Sans TC', sans-serif";
  ctx.fillText(primary.theme[locale], 140, cardTop + 120);
  drawHexagram(ctx, result.lines, 140, cardTop + 154, 230, theme, true);

  ctx.strokeStyle = colors.rule;
  ctx.beginPath();
  ctx.moveTo(530, cardTop + 34);
  ctx.lineTo(530, cardTop + 236);
  ctx.stroke();
  ctx.fillStyle = colors.accent;
  ctx.font = "600 15px 'Noto Sans TC', sans-serif";
  ctx.fillText(copy.relating, 590, cardTop + 48);
  ctx.fillStyle = colors.ink;
  ctx.font = "600 34px 'Noto Serif TC', serif";
  ctx.fillText(relating.names[locale], 590, cardTop + 88);
  ctx.fillStyle = colors.muted;
  ctx.font = "500 16px 'Noto Sans TC', sans-serif";
  ctx.fillText(relating.theme[locale], 590, cardTop + 120);
  drawHexagram(ctx, result.lines.map((line) => ({ ...line, yin: line.changing ? !line.yin : line.yin, changing: false })), 590, cardTop + 154, 230, theme, false);
  ctx.fillStyle = colors.muted;
  ctx.font = "500 14px 'Noto Sans TC', sans-serif";
  ctx.fillText(`${result.changingLines.length} changing · ${result.changingLines.join(", ") || "—"}`, 890, cardTop + 228);

  const readingTop = cardTop + 342;
  ctx.fillStyle = colors.accent;
  ctx.font = "600 15px 'Noto Sans TC', sans-serif";
  ctx.fillText(copy.direction, 96, readingTop);
  ctx.fillStyle = colors.ink;
  ctx.font = "500 25px 'Noto Sans TC', sans-serif";
  const readingBottom = drawWrappedText(ctx, primary.advice[locale], 96, readingTop + 48, 920, 42, 3);
  ctx.fillStyle = colors.muted;
  ctx.font = "400 18px 'Noto Sans TC', sans-serif";
  drawWrappedText(ctx, primary.reading[locale], 96, readingBottom + 22, 900, 32, 4);

  ctx.strokeStyle = colors.rule;
  ctx.beginPath();
  ctx.moveTo(96, 1318);
  ctx.lineTo(1104, 1318);
  ctx.stroke();
  ctx.fillStyle = colors.muted;
  ctx.font = "500 14px 'Noto Sans TC', sans-serif";
  ctx.fillText(copy.note, 96, 1360);
  ctx.fillStyle = colors.accent;
  ctx.font = "600 14px 'Noto Sans TC', sans-serif";
  ctx.fillText(copy.footer, 96, 1404);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create the share card.")), "image/png");
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
