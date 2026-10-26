import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_SHORT } from "@/config/site";

const beads = Array.from({ length: 40 }, (_, i) => {
  const a = (i / 40) * Math.PI * 2;
  return { cx: +(32 + 28.6 * Math.cos(a)).toFixed(2), cy: +(32 + 28.6 * Math.sin(a)).toFixed(2) };
});

/**
 * Sigiliul biroului: o coloană clasică purtând o balanță, într-un sigiliu rotund
 * cu chenar de perle. Liniile au pathLength=1, ca să se „deseneze” la încărcare.
 */
export function SealMark({
  size = 48,
  className,
  tone = "green",
  x,
  y,
}: {
  x?: number;
  y?: number;
  size?: number;
  className?: string;
  /** green = disc verde cu linii ivoire; ink = doar linii, pentru amprenta ștampilei. */
  tone?: "green" | "ink";
}) {
  const ink = tone === "ink";
  const line = ink ? "currentColor" : "#F6F1E7";
  const brass = ink ? "currentColor" : "#C2A05A";
  return (
    <svg
      className={`seal ${className ?? ""}`}
      width={size}
      height={size}
      x={x}
      y={y}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      {!ink && <circle cx="32" cy="32" r="31" fill="#12372F" />}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle className="draw" pathLength={1} cx="32" cy="32" r="30.6" stroke={brass} strokeWidth="1" />
        <circle className="draw" pathLength={1} cx="32" cy="32" r="26.4" stroke={brass} strokeWidth=".7" />
        <circle className="draw draw--late" pathLength={1} cx="32" cy="32" r="23.6" stroke={line} strokeWidth=".5" strokeDasharray={ink ? "1 1.6" : undefined} />
        {/* Balanța: brațul, firele și talerele */}
        <path className="draw draw--late" pathLength={1} d="M17.5 19.5h29" stroke={brass} strokeWidth="1.3" />
        <path className="draw draw--late" pathLength={1} d="M19.5 19.8 16 29.2M19.5 19.8 23 29.2M44.5 19.8 41 29.2M44.5 19.8 48 29.2" stroke={line} strokeWidth=".7" />
        <path className="draw draw--late" pathLength={1} d="M15.2 29.2q4.3 4.2 8.6 0zM40.2 29.2q4.3 4.2 8.6 0z" stroke={brass} strokeWidth="1" />
        {/* Coloana: capitel cu volute, fus canelat, bază în trepte */}
        <path className="draw" pathLength={1} d="M26 23.2h12M27.2 25.2h9.6" stroke={line} strokeWidth="1.1" />
        <path className="draw" pathLength={1} d="M27.2 25.2a1.6 1.6 0 1 1-1.6-1.6M36.8 25.2a1.6 1.6 0 1 0 1.6-1.6" stroke={line} strokeWidth=".8" />
        <path className="draw" pathLength={1} d="M28.4 26.4v15.4M35.6 26.4v15.4" stroke={line} strokeWidth="1.1" />
        <path className="draw draw--late" pathLength={1} d="M30.8 27.4v13.4M33.2 27.4v13.4" stroke={line} strokeWidth=".55" />
        <path className="draw" pathLength={1} d="M27 42h10M25.8 44.4h12.4M24.4 46.8h15.2" stroke={line} strokeWidth="1.1" />
      </g>
      <circle className="seal__finial" cx="32" cy="17.4" r="1.4" fill={brass} />
      <g className="seal__beads" fill={brass}>
        {beads.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r=".55" />
        ))}
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  const prefix = BUSINESS_NAME.slice(0, BUSINESS_NAME.length - BUSINESS_SHORT.length).trim();
  return (
    <Link href="/" className={`logo ${className ?? ""}`} aria-label={`${BUSINESS_NAME}, prima pagină`}>
      <SealMark size={46} className="seal--draw" />
      <span className="logo__word">
        {prefix && <span className="logo__prefix">{prefix}</span>}
        <span className="logo__name">{BUSINESS_SHORT}</span>
      </span>
    </Link>
  );
}
