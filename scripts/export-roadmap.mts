// Renders the English roadmap illustration to public/roadmap.png (for sharing on WhatsApp).
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { en } from "../locales/en.ts";
import { buildRoadmapSvg } from "../lib/roadmapSvg.ts";

const svg = buildRoadmapSvg(en.roadmap, "wide", "Helvetica, Arial, sans-serif");
writeFileSync("public/roadmap.svg", svg);
await sharp(Buffer.from(svg), { density: 192 }).png().toFile("public/roadmap.png");
console.log("wrote public/roadmap.png");
