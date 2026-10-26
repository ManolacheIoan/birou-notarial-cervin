// Generează decorurile SVG statice din public/: rozeta și banda de tip guilloche,
// plus textura de hârtie. Rulează: node scripts/decor.mjs
import { writeFileSync } from "node:fs";

const f = (n) => Math.round(n * 10) / 10;

/** O curbă închisă: raza oscilează în jurul lui R (o „undă” circulară). */
function ring(cx, cy, R, amp, waves, phase, steps = 150) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = R + amp * Math.sin(waves * t + phase);
    d += `${i ? "L" : "M"}${f(cx + r * Math.cos(t))} ${f(cy + r * Math.sin(t))}`;
  }
  return d + "Z";
}

function rosette(color) {
  const paths = [];
  // Inele suprapuse, fiecare decalat ușor: efectul clasic de guilloche.
  for (let k = 0; k < 14; k++) paths.push(ring(200, 200, 150, 22, 18, (k * Math.PI) / 14));
  for (let k = 0; k < 10; k++) paths.push(ring(200, 200, 96, 12, 12, (k * Math.PI) / 10));
  for (let k = 0; k < 6; k++) paths.push(ring(200, 200, 52, 7, 8, (k * Math.PI) / 6));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><g fill="none" stroke="${color}" stroke-width=".6">${paths
    .map((d) => `<path d="${d}"/>`)
    .join("")}<circle cx="200" cy="200" r="182"/><circle cx="200" cy="200" r="186"/></g></svg>`;
}

function band(color) {
  // Undă orizontală repetabilă (lățime 120), pentru separatoare.
  const lines = [];
  for (let k = 0; k < 7; k++) {
    let d = "";
    for (let x = 0; x <= 120; x += 2) {
      const y = 12 + 7 * Math.sin((x / 120) * Math.PI * 4 + (k * Math.PI) / 7);
      d += `${x ? "L" : "M"}${x} ${f(y)}`;
    }
    lines.push(d);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="24" viewBox="0 0 120 24"><g fill="none" stroke="${color}" stroke-width=".7">${lines
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g></svg>`;
}

const grain = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .3 0 0 0 0 .2 0 0 0 .09 0"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`;

writeFileSync("public/guilloche.svg", rosette("#A8843F"));
writeFileSync("public/guilloche-light.svg", rosette("#D2B272"));
writeFileSync("public/band.svg", band("#A8843F"));
writeFileSync("public/grain.svg", grain);
console.log("decor generat");
