// Generează rozeta guilloche din public/ (folosită în banda de contact).
// Panourile de ilustrație folosesc varianta inline din components/illustrations/Guilloche.tsx. Rulează: node scripts/decor.mjs
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

writeFileSync("public/guilloche-light.svg", rosette("#D2B272"));
console.log("decor generat");
