// Builds the roadmap illustration as an SVG string. Used by the page (inline) and by
// scripts/export-roadmap.ts (to produce public/roadmap.png for sharing).
import type { Dict } from "@/locales/en";

const C = {
  green: "#1f5d3a",
  leaf: "#3a9a5c",
  gold: "#e8b030",
  cream: "#f8edd3",
  paper: "#fff8e6",
  red: "#c1121f",
  brown: "#a8723a",
  dark: "#4a3320",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function icon(step: number, x: number, y: number): string {
  const g = (inner: string) => `<g transform="translate(${x} ${y})">${inner}</g>`;
  if (step === 0) {
    // a single coconut with its tuft (kudumi)
    return g(
      `<ellipse cx="0" cy="6" rx="19" ry="21" fill="${C.brown}"/>` +
        `<ellipse cx="-6" cy="-1" rx="7" ry="9" fill="#c99560" opacity=".6"/>` +
        `<path d="M0 -14 C-8 -30 -16 -26 -20 -32 M0 -14 C2 -32 8 -34 10 -40 M0 -14 C8 -26 16 -24 22 -30" stroke="${C.leaf}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    );
  }
  if (step === 1) {
    // linked societies: three circles joined
    return g(
      `<path d="M-18 8 L0 -14 L18 8 Z" fill="none" stroke="${C.gold}" stroke-width="3"/>` +
        `<circle cx="-18" cy="8" r="9" fill="${C.cream}"/><circle cx="18" cy="8" r="9" fill="${C.cream}"/><circle cx="0" cy="-14" r="9" fill="${C.cream}"/>`,
    );
  }
  // step 2: delivery truck
  return g(
    `<rect x="-24" y="-14" width="30" height="22" rx="3" fill="${C.cream}"/>` +
      `<path d="M6 -8 H18 L26 2 V8 H6 Z" fill="${C.gold}"/>` +
      `<circle cx="-12" cy="12" r="6" fill="${C.dark}"/><circle cx="14" cy="12" r="6" fill="${C.dark}"/>`,
  );
}

type Labels = Pick<Dict["roadmap"], "svg" | "current" | "stepLabel">;

function block(
  step: number,
  x: number,
  y: number,
  anchor: "middle" | "start",
  labels: Labels,
  width: number,
  fs: number,
): string {
  const d = labels.svg[step];
  const lh = fs * 1.45;
  let out = `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fs - 3}" font-weight="700" letter-spacing="1.5" fill="${C.red}">${esc(
    `${labels.stepLabel.toUpperCase()} ${step}`,
  )}</text>`;
  out += `<text x="${x}" y="${y + fs * 1.6}" text-anchor="${anchor}" font-size="${fs * 1.45}" font-weight="700" fill="${C.green}">${esc(d.title)}</text>`;
  d.items.forEach((it, i) => {
    const ty = y + fs * 1.6 + fs * 1.2 + lh * (i + 0.6);
    const bx = anchor === "middle" ? x - width / 2 : x;
    out += `<circle cx="${bx + 5}" cy="${ty - fs * 0.32}" r="3.5" fill="${C.gold}"/>`;
    out += `<text x="${bx + 16}" y="${ty}" font-size="${fs}" fill="${C.dark}">${esc(it)}</text>`;
  });
  return out;
}

function stop(step: number, cx: number, cy: number, labels: Labels, ribbon: "below" | "right"): string {
  let s =
    `<circle cx="${cx}" cy="${cy}" r="50" fill="${C.green}" stroke="${C.gold}" stroke-width="6"/>` + icon(step, cx, cy);
  if (step === 0) {
    const w = 150;
    const rx = ribbon === "below" ? cx - w / 2 : cx - w / 2;
    const ry = cy + 62;
    s +=
      `<g><path d="M${rx - 10} ${ry} h${w + 20} l-10 13 l10 13 h-${w + 20} l10 -13 z" fill="#8e0d18"/>` +
      `<rect x="${rx}" y="${ry}" width="${w}" height="26" fill="${C.red}"/>` +
      `<text x="${cx}" y="${ry + 18}" text-anchor="middle" font-size="13" font-weight="700" letter-spacing=".5" fill="${C.cream}">${esc(
        labels.current.toUpperCase(),
      )}</text></g>`;
  }
  return s;
}

export function buildRoadmapSvg(labels: Labels, layout: "wide" | "tall", font = "inherit"): string {
  const defs = `<defs><linearGradient id="sky-${layout}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.paper}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient></defs>`;
  if (layout === "wide") {
    const W = 1200;
    const H = 470;
    const pts = [
      [190, 330],
      [600, 300],
      [1010, 330],
    ];
    const road = `M-20 420 C 80 420 100 330 190 330 S 330 380 400 350 S 520 300 600 300 S 730 360 800 350 S 920 330 1010 330 S 1120 420 1220 420`;
    let body =
      `<rect width="${W}" height="${H}" rx="24" fill="url(#sky-wide)"/>` +
      `<path d="M0 430 Q300 380 600 420 T1200 410 V470 H0 Z" fill="${C.leaf}" opacity=".25"/>` +
      `<path d="${road}" fill="none" stroke="${C.brown}" stroke-width="30" stroke-linecap="round" opacity=".85"/>` +
      `<path d="${road}" fill="none" stroke="${C.cream}" stroke-width="3" stroke-dasharray="4 14" stroke-linecap="round"/>`;
    pts.forEach(([cx, cy], i) => {
      body += block(i, cx, 40, "middle", labels, 330, 17);
      body += stop(i, cx, cy, labels, "below");
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="${font}" role="img" aria-label="Roadmap">${defs}${body}</svg>`;
  }
  const W = 420;
  const H = 1120;
  const pts = [
    [80, 170],
    [80, 560],
    [80, 950],
  ];
  const road = `M80 -20 C 80 60 80 80 80 170 S 200 360 80 560 S 200 760 80 950 S 80 1060 80 1140`;
  let body =
    `<rect width="${W}" height="${H}" rx="24" fill="url(#sky-tall)"/>` +
    `<path d="${road}" fill="none" stroke="${C.brown}" stroke-width="28" stroke-linecap="round" opacity=".85"/>` +
    `<path d="${road}" fill="none" stroke="${C.cream}" stroke-width="3" stroke-dasharray="4 14" stroke-linecap="round"/>`;
  pts.forEach(([cx, cy], i) => {
    body += block(i, 160, cy - 62, "start", labels, 240, 16);
    body += stop(i, cx, cy, labels, "below");
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="${font}" role="img" aria-label="Roadmap">${defs}${body}</svg>`;
}
