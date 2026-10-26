/**
 * Rozetă guilloche desenată direct în pagină (fără fișier extern): câte un inel
 * de bază, repetat prin <use> cu rotiri mici. Pur decorativă.
 */
const f = (n: number) => Math.round(n * 10) / 10;

function ring(R: number, amp: number, waves: number, steps = 120) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = R + amp * Math.sin(waves * t);
    d += `${i ? "L" : "M"}${f(200 + r * Math.cos(t))} ${f(200 + r * Math.sin(t))}`;
  }
  return d + "Z";
}

const rings = [
  { d: ring(150, 22, 18), copies: 10, step: 20 / 10 },
  { d: ring(96, 12, 12), copies: 8, step: 30 / 8 },
  { d: ring(52, 7, 8), copies: 6, step: 45 / 6 },
];

export function Guilloche({ className, id }: { className?: string; id: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        {rings.map((r, i) => (
          <path key={i} id={`${id}-r${i}`} d={r.d} />
        ))}
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth=".6">
        {rings.map((r, i) =>
          Array.from({ length: r.copies }, (_, k) => (
            <use key={`${i}-${k}`} href={`#${id}-r${i}`} transform={`rotate(${f(k * r.step)} 200 200)`} />
          )),
        )}
        <circle cx="200" cy="200" r="182" />
        <circle cx="200" cy="200" r="186" />
      </g>
    </svg>
  );
}

/** Panou pentru ilustrații: rozetă, textură de hârtie și chenar fin. */
export function ArtPanel({ children, className, id }: { children: React.ReactNode; className?: string; id: string }) {
  return (
    <div className={`art-panel ${className ?? ""}`}>
      <Guilloche id={id} className="art-panel__guilloche" />
      {children}
    </div>
  );
}
