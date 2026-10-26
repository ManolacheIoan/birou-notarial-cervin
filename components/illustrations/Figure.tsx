import { useId } from "react";
import type { Figure as FigureKind } from "@/data/staff";

/**
 * Portrete ilustrate în stil gravură: bust într-o fereastră arcuită, cu hașuri
 * fine și o masă cu obiectul de lucru al fiecărei persoane. Fără fotografii.
 */

const INK = "#1D2420";
const SKIN = "#F1E5CF";
const BRASS = "#A8843F";
const PAPER = "#FFFDF8";

type Look = {
  hair: "bun" | "short" | "bob" | "crop" | "long";
  hairColor: string;
  jacket: string;
  collar: "blouse" | "tie" | "turtleneck" | "open" | "scarf";
  glasses?: boolean;
  beard?: boolean;
  prop: "stamp" | "books" | "phone" | "folders" | "quill";
};

const looks: Record<FigureKind, Look> = {
  notary: { hair: "bun", hairColor: "#2B2A26", jacket: "#12372F", collar: "blouse", prop: "stamp" },
  deputy: { hair: "short", hairColor: "#4A4038", jacket: "#22302B", collar: "tie", glasses: true, prop: "books" },
  "clerk-a": { hair: "bob", hairColor: "#5A3B2A", jacket: "#3C5A50", collar: "turtleneck", prop: "phone" },
  "clerk-b": { hair: "crop", hairColor: "#2F2B27", jacket: "#2C3A35", collar: "open", beard: true, prop: "folders" },
  "clerk-c": { hair: "long", hairColor: "#7A5638", jacket: "#12372F", collar: "scarf", glasses: true, prop: "quill" },
};

function HairBack({ look }: { look: Look }) {
  if (look.hair !== "long") return null;
  return (
    <path
      d="M70 100C62 68 84 56 100 56c18 0 40 12 30 44 4 20 8 40 2 58H68c-6-18-2-38 2-58Z"
      fill={look.hairColor}
      stroke={INK}
      strokeWidth="1.2"
      transform="translate(0 6)"
    />
  );
}

function HairFront({ look, hatch }: { look: Look; hatch: string }) {
  const p = { fill: look.hairColor, stroke: INK, strokeWidth: 1.2 };
  switch (look.hair) {
    case "bun":
      return (
        <g>
          <circle cx="100" cy="60" r="11" {...p} />
          <path d="M74 99c-4-28 12-37 26-37s30 9 26 37c-4-14-14-22-26-22s-22 8-26 22Z" {...p} />
          <path d="M84 70c6-4 12-5 16-5M104 66c8 1 14 5 17 10" stroke={PAPER} strokeOpacity=".35" strokeWidth=".6" fill="none" />
        </g>
      );
    case "short":
      return (
        <path
          d="M75 96c-3-24 11-32 25-32 16 0 29 8 25 32-2-12-9-16-17-17-10-1-20 1-26 5-4 3-6 7-7 12Z"
          {...p}
        />
      );
    case "bob":
      return (
        <path
          d="M72 104c-6-34 12-44 28-44 18 0 34 10 28 44v18c-2 4-6 4-8 0 2-20-4-40-20-42-14 0-22 16-20 42-2 4-6 4-8 0Z"
          {...p}
        />
      );
    case "crop":
      return (
        <g>
          <path d="M76 94c-2-22 10-29 24-29s26 7 24 29c-3-9-10-13-24-13s-21 4-24 13Z" {...p} />
          <path d="M80 80h40" stroke={`url(#${hatch})`} strokeWidth="6" opacity=".4" />
        </g>
      );
    case "long":
      return <path d="M76 98c-2-24 10-34 24-34s27 10 25 34c-6-12-14-18-25-18-10 0-18 6-24 18Z" {...p} />;
  }
}

function Collar({ look }: { look: Look }) {
  const s = { stroke: INK, strokeWidth: 1.1 };
  switch (look.collar) {
    case "blouse":
      return (
        <g>
          <path d="M84 146 100 180l16-34Z" fill={PAPER} {...s} />
          <path d="M92 150c3 6 13 6 16 0" fill="none" {...s} strokeWidth=".7" />
          <circle cx="100" cy="164" r="3" fill={BRASS} {...s} strokeWidth=".7" />
        </g>
      );
    case "tie":
      return (
        <g>
          <path d="M84 146 100 182l16-36Z" fill={PAPER} {...s} />
          <path d="m100 152-4 5 4 24 4-24Z" fill="#7A5C22" {...s} strokeWidth=".8" />
        </g>
      );
    case "turtleneck":
      return <path d="M86 140c8 7 20 7 28 0l2 12c-10 9-22 9-32 0Z" fill="#E6DAC0" {...s} />;
    case "open":
      return (
        <g>
          <path d="M86 146 100 172l14-26Z" fill={PAPER} {...s} />
          <path d="m86 146-6 10 12 6M114 146l6 10-12 6" fill={PAPER} {...s} strokeWidth=".8" />
        </g>
      );
    case "scarf":
      return (
        <g>
          <path d="M84 146 100 176l16-30Z" fill={PAPER} {...s} />
          <path d="M84 144c10 10 22 10 32 0l2 8c-4 6-10 10-14 10l4 26-8 2-4-26c-6-2-10-6-14-12Z" fill={BRASS} {...s} strokeWidth=".8" />
        </g>
      );
  }
}

function Prop({ look }: { look: Look }) {
  const s = { stroke: INK, strokeWidth: 1.1, strokeLinejoin: "round" as const };
  switch (look.prop) {
    case "stamp":
      return (
        <g>
          {/* Ștampila și stiloul notarului */}
          <ellipse cx="56" cy="201" rx="16" ry="3" fill={INK} opacity=".12" />
          <rect x="40" y="192" width="32" height="8" rx="2" fill={BRASS} {...s} />
          <path d="M50 192c-2-6-2-12 2-16-4-6 0-14 4-14s8 8 4 14c4 4 4 10 2 16Z" fill="#6B4E2E" {...s} />
          <path d="m112 204 52-14" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="m112 204 52-14" stroke={BRASS} strokeWidth="1.2" strokeLinecap="round" />
          <path d="m108 205 5-1" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    case "books":
      return (
        <g>
          <rect x="34" y="186" width="54" height="8" rx="1.5" fill="#12372F" {...s} />
          <rect x="38" y="178" width="48" height="8" rx="1.5" fill="#7A5C22" {...s} />
          <path d="M44 182h36M40 190h44" stroke={BRASS} strokeWidth=".6" />
          <path d="M120 196h46l-4-10h-38Z" fill={PAPER} {...s} />
        </g>
      );
    case "phone":
      return (
        <g>
          <path d="M120 196c0-8 4-12 10-12h22c6 0 10 4 10 12Z" fill="#22302B" {...s} />
          <path d="M124 182c-2-6 2-9 6-9h22c4 0 8 3 6 9" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="141" cy="190" r="3" fill={BRASS} />
          <path d="M36 194h40l-3-8H39Z" fill={PAPER} {...s} />
          <path d="M44 189h24" stroke={INK} strokeWidth=".6" />
        </g>
      );
    case "folders":
      return (
        <g>
          <path d="M34 196h56l-4-16H38Z" fill="#E6DAC0" {...s} />
          <path d="M38 190h52l-4-16H42Z" fill="#3C5A50" {...s} />
          <path d="M46 174h12l2 4" fill="none" {...s} />
          <path d="M124 196h40l-2-10h-36Z" fill={PAPER} {...s} />
          <path d="M132 191h22" stroke={INK} strokeWidth=".6" />
        </g>
      );
    case "quill":
      return (
        <g>
          <path d="M132 196c-4-4-4-12 2-14h16c6 2 6 10 2 14Z" fill="#22302B" {...s} />
          <path d="M142 182c-4-20 4-36 22-46-2 14-8 30-20 46Z" fill={PAPER} {...s} />
          <path d="M142 182c4-14 10-28 20-42" stroke={INK} strokeWidth=".6" />
          <path d="M34 196h60l-4-10H38Z" fill={PAPER} {...s} />
          <path d="M44 191c6-3 10 2 16-1s8 2 14 0" fill="none" stroke={INK} strokeWidth=".7" />
        </g>
      );
  }
}

export function StaffFigure({
  kind,
  className,
  frame,
}: {
  kind: FigureKind;
  className?: string;
  /** Poziție și mărime când portretul e inclus într-o scenă SVG. */
  frame?: { x: number; y: number; width: number };
}) {
  const look = looks[kind];
  const id = useId().replace(/:/g, "");
  const clip = `arc-${id}`;
  const hatch = `hatch-${id}`;
  const hatchLight = `hatchl-${id}`;
  const face = `face-${id}`;
  return (
    <svg
      className={`figure ${className ?? ""}`}
      viewBox="0 0 200 220"
      x={frame?.x}
      y={frame?.y}
      width={frame?.width}
      height={frame ? (frame.width * 220) / 200 : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <path d="M20 220V100a80 80 0 0 1 160 0v120Z" />
        </clipPath>
        <clipPath id={face}>
          <ellipse cx="100" cy="98" rx="25" ry="30" />
        </clipPath>
        <pattern id={hatch} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <path d="M0 0v4" stroke={INK} strokeWidth=".7" />
        </pattern>
        <pattern id={hatchLight} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <path d="M0 0v5" stroke={PAPER} strokeWidth=".6" strokeOpacity=".35" />
        </pattern>
      </defs>

      {/* Fereastra arcuită, cu linii fine de fundal */}
      <path d="M20 220V100a80 80 0 0 1 160 0v120Z" fill="#EFE6D2" />
      <g clipPath={`url(#${clip})`}>
        <g fill="none" stroke={BRASS} strokeOpacity=".35" strokeWidth=".5">
          {[70, 60, 50, 40].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} />
          ))}
        </g>
        <HairBack look={look} />
        {/* Umeri și sacou */}
        <path d="M24 214c4-42 32-66 76-68 44 2 72 26 76 68v6H24Z" fill={look.jacket} stroke={INK} strokeWidth="1.2" />
        <path d="M24 214c4-42 32-66 76-68" fill={`url(#${hatchLight})`} />
        <path d="M30 220c6-38 26-58 54-70M170 220c-6-38-26-58-54-70" fill="none" stroke={BRASS} strokeOpacity=".5" strokeWidth=".6" />
        {/* Gât */}
        <path d="M88 126v22q12 8 24 0v-22Z" fill={SKIN} stroke={INK} strokeWidth="1.1" />
        <path d="M88 134h24v8H88Z" fill={`url(#${hatch})`} opacity=".45" />
        <Collar look={look} />
        <path d="m84 146 8 44 8-12M116 146l-8 44-8-12" fill="none" stroke={INK} strokeWidth="1" />
        {/* Cap */}
        <g transform="translate(0 6)">
        <ellipse cx="76" cy="101" rx="4" ry="7" fill={SKIN} stroke={INK} strokeWidth="1" />
        <ellipse cx="124" cy="101" rx="4" ry="7" fill={SKIN} stroke={INK} strokeWidth="1" />
        <ellipse cx="100" cy="98" rx="25" ry="30" fill={SKIN} stroke={INK} strokeWidth="1.2" />
        <g clipPath={`url(#${face})`}>
          <path d="M114 70q16 28 2 58h14V70Z" fill={`url(#${hatch})`} opacity=".55" />
        </g>
        {look.beard && (
          <path d="M77 104c1 16 10 24 23 24s22-8 23-24c-5 10-13 14-23 14s-18-4-23-14Z" fill={look.hairColor} stroke={INK} strokeWidth="1" />
        )}
        <HairFront look={look} hatch={hatch} />
        {/* Trăsături, desenate cu linie fină */}
        <g fill="none" stroke={INK} strokeLinecap="round">
          <path d="M87 91q4-3 9-1M104 90q5-2 9 1" strokeWidth="1.2" />
          <path d="M89 99q3-2 6 0M105 99q3-2 6 0" strokeWidth="1.3" />
          <path d="M100 99q-2.5 8-1.5 11.5 2 1 4 0" strokeWidth=".9" />
          <path d={look.beard ? "M95 116q5 2 10 0" : "M94 116q6 3.5 12 0"} strokeWidth="1.1" />
          {look.glasses && (
            <g strokeWidth="1">
              <circle cx="92" cy="99" r="6.5" />
              <circle cx="108" cy="99" r="6.5" />
              <path d="M98.5 98.5q1.5-1.5 3 0M85.5 98l-9-2M114.5 98l9-2" />
            </g>
          )}
        </g>
        </g>
        {/* Masa de lucru */}
        <rect x="20" y="198" width="160" height="22" fill="#E6DAC0" />
        <path d="M20 198h160" stroke={BRASS} strokeWidth="1.2" />
        <path d="M20 204h160" stroke={INK} strokeOpacity=".2" strokeWidth=".6" />
        <Prop look={look} />
      </g>
      <path d="M20 220V100a80 80 0 0 1 160 0v120" fill="none" stroke={INK} strokeWidth="1.2" />
      <path d="M26 220V100a74 74 0 0 1 148 0v120" fill="none" stroke={BRASS} strokeWidth=".7" />
    </svg>
  );
}

/**
 * Siluetă de client: bust plin, fără trăsături, în stilul gravurii.
 * `variant` schimbă coafura, ca un grup de clienți să nu arate identic.
 */
export function ClientSilhouette({
  variant = 0,
  x = 0,
  y = 0,
  scale = 1,
  tone = "#2F5247",
}: {
  variant?: 0 | 1 | 2;
  x?: number;
  y?: number;
  scale?: number;
  tone?: string;
}) {
  const hair = [
    "M-22 -14c-2-22 8-32 22-32s24 10 22 32c-4-10-12-16-22-16s-18 6-22 16Z",
    "M-24 -8c-6-28 8-40 24-40s30 12 24 40l2 22c-4 4-8 2-8-2 2-16-4-34-18-34s-20 18-18 34c0 4-4 6-8 2Z",
    "M-21 -12c-1-20 8-30 21-30 14 0 23 10 21 30-3-8-10-12-21-12s-18 4-21 12Z",
  ][variant];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-56 96c4-38 26-56 56-58 30 2 52 20 56 58Z" fill={tone} />
      <path d="M-50 96c4-32 22-48 46-52" fill="none" stroke="#FFFDF8" strokeOpacity=".3" strokeWidth=".8" />
      <path d="M-10 18h20v22h-20Z" fill={tone} />
      <ellipse cx="0" cy="-6" rx="22" ry="27" fill={tone} />
      <path d={hair} fill="#0F201B" />
      <path d="M14 -20q8 14 0 32" fill="none" stroke="#FFFDF8" strokeOpacity=".35" strokeWidth=".8" />
    </g>
  );
}
