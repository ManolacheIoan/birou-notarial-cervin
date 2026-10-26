import { SealMark } from "@/components/Logo";
import { ClientSilhouette, StaffFigure } from "@/components/illustrations/Figure";

const INK = "#1D2420";
const BRASS = "#A8843F";
const PAPER = "#FFFDF8";
const GREEN = "#12372F";

const textLines = [
  [150, 360],
  [150, 372],
  [150, 330],
  [150, 368],
  [150, 300],
  [150, 372],
  [150, 352],
  [150, 280],
];

/** Foaia de contract, folosită în hero și pe pagina 404. */
function ContractSheet({ empty = false }: { empty?: boolean }) {
  return (
    <g>
      <rect x="122" y="78" width="290" height="320" rx="3" fill="#EFE6D2" stroke={INK} strokeOpacity=".4" />
      <rect x="110" y="68" width="290" height="320" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.2" />
      <path d="M118 76h274v304H118Z" fill="none" stroke={BRASS} strokeOpacity=".55" strokeWidth=".6" />
      {!empty && (
        <g>
          <rect x="205" y="98" width="100" height="6" rx="3" fill={INK} opacity=".85" />
          <path d="M225 114h60" stroke={BRASS} strokeWidth="1.2" />
          <g stroke="#9AA39D" strokeWidth="2.4" strokeLinecap="round">
            {textLines.map(([x1, x2], i) => (
              <path key={i} d={`M${x1} ${140 + i * 16}H${x2}`} />
            ))}
          </g>
          <g stroke={INK} strokeWidth=".9">
            <path d="M146 340h92M270 340h92" />
          </g>
          <path
            d="M150 334c8-16 16 4 24-8s10 8 18-2 8 6 18-3"
            fill="none"
            stroke="#1E3A5C"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      )}
      {/* Panglica prinsă în colț */}
      <path d="M134 382 122 424l11-7 9 11 4-44" fill={GREEN} stroke={INK} strokeWidth="1" />
      <path d="M146 384 160 422l3-12 12 3-15-30" fill="#1B4A3F" stroke={INK} strokeWidth="1" />
      <circle cx="141" cy="378" r="9" fill={BRASS} stroke={INK} strokeWidth="1" />
      <circle cx="141" cy="378" r="5.5" fill="none" stroke={PAPER} strokeOpacity=".6" strokeWidth=".7" />
    </g>
  );
}

function Inkwell() {
  return (
    <g>
      <path d="M44 194c-8-30 0-70 30-104-4 28-12 70-24 104Z" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <path d="M48 192c4-32 12-68 24-98" stroke={INK} strokeWidth=".7" fill="none" />
      <path d="M52 140l10-4M50 156l10-3M48 172l9-2M56 120l9-5" stroke={INK} strokeOpacity=".5" strokeWidth=".6" />
      <path d="M26 236c-4-14 2-30 14-34h20c12 4 18 20 14 34Z" fill={GREEN} stroke={INK} strokeWidth="1.2" />
      <rect x="36" y="192" width="28" height="10" rx="2" fill={BRASS} stroke={INK} strokeWidth="1" />
      <path d="M34 214c4-6 8-8 12-8" stroke={PAPER} strokeOpacity=".45" fill="none" />
    </g>
  );
}

/**
 * Scena din hero: o ștampilă coboară pe un contract și lasă amprenta sigiliului.
 * Starea finală (ștampila ridicată, amprenta vizibilă) este starea implicită din CSS;
 * animația rulează doar dacă mișcarea nu este redusă.
 */
export function StampScene() {
  return (
    <svg className="stamp-scene" viewBox="0 0 520 440" aria-hidden="true" focusable="false">
      <ellipse cx="270" cy="410" rx="230" ry="16" fill={INK} opacity=".06" />
      <g transform="rotate(-3 255 228)">
        <ContractSheet />
        <g className="stamp-scene__impression">
          <SealMark tone="ink" size={96} x={282} y={250} className="impression" />
        </g>
      </g>
      <g transform="translate(14 150)">
        <Inkwell />
      </g>
      <ellipse className="stamp-scene__shadow" cx="330" cy="312" rx="50" ry="7" fill={INK} />
      <g className="stamp-scene__stamp">
        <rect x="282" y="290" width="96" height="16" rx="3" fill={BRASS} stroke={INK} strokeWidth="1.2" />
        <path d="M288 296h84" stroke={PAPER} strokeOpacity=".5" strokeWidth=".8" />
        <path d="M292 290 300 276h60l8 14Z" fill="#8C6B2E" stroke={INK} strokeWidth="1.2" />
        <path d="M321 276c-6-16-10-28-4-38-10-12-6-34 13-38 19 4 23 26 13 38 6 10 2 22-4 38Z" fill={GREEN} stroke={INK} strokeWidth="1.2" />
        <path d="M326 208c-6 4-8 14-5 22" stroke={PAPER} strokeOpacity=".45" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <rect x="314" y="236" width="32" height="6" rx="2" fill={BRASS} stroke={INK} strokeWidth="1" />
      </g>
    </svg>
  );
}

/** O masă de semnare: doi clienți (siluete) și notarul, cu documentul între ei. */
export function SigningScene() {
  return (
    <svg className="signing-scene" viewBox="0 0 520 300" aria-hidden="true" focusable="false">
      <ClientSilhouette variant={1} x={96} y={124} scale={1.1} />
      <ClientSilhouette variant={0} x={200} y={136} scale={1.05} tone="#244339" />
      <StaffFigure kind="notary" frame={{ x: 318, y: 22, width: 190 }} />
      <rect x="10" y="236" width="500" height="20" rx="3" fill="#E6DAC0" stroke={INK} strokeWidth="1.1" />
      <path d="M10 240h500" stroke={BRASS} strokeWidth="1" />
      <g transform="rotate(-4 260 226)">
        <rect x="210" y="212" width="110" height="28" rx="2" fill={PAPER} stroke={INK} strokeWidth="1" />
        <path d="M222 222h70M222 230h50" stroke="#9AA39D" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="304" cy="228" r="7" fill="none" stroke={GREEN} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Pagina 404: o filă goală, cu locul sigiliului marcat punctat. */
export function EmptyRegisterScene() {
  return (
    <svg className="empty-scene" viewBox="0 0 520 440" aria-hidden="true" focusable="false">
      <g transform="rotate(2 255 228)">
        <ContractSheet empty />
        <circle cx="255" cy="228" r="58" fill="none" stroke={BRASS} strokeWidth="1.4" strokeDasharray="4 6" className="empty-scene__ring" />
        <g stroke="#9AA39D" strokeWidth="2.4" strokeLinecap="round">
          <path d="M170 120h170M170 136h120" />
        </g>
      </g>
      <g transform="translate(420 300) rotate(-18)">
        <rect x="-40" y="40" width="80" height="14" rx="3" fill={BRASS} stroke={INK} strokeWidth="1.2" />
        <path d="M-34 40l8-12h52l8 12Z" fill="#8C6B2E" stroke={INK} strokeWidth="1.2" />
        <path d="M-7 28c-6-14-9-24-4-33-9-10-5-29 11-33 16 4 20 23 11 33 5 9 2 19-4 33Z" fill={GREEN} stroke={INK} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Plan stilizat al străzii, desenat local (fără hărți sau scripturi externe). */
export function StreetPlan() {
  return (
    <svg className="street-plan" viewBox="0 0 480 320" aria-hidden="true" focusable="false">
      <rect width="480" height="320" fill="#EFE6D2" />
      <g fill="#E6DAC0" stroke={INK} strokeOpacity=".25" strokeWidth=".8">
        <rect x="20" y="20" width="130" height="90" rx="4" />
        <rect x="190" y="20" width="110" height="90" rx="4" />
        <rect x="340" y="20" width="120" height="90" rx="4" />
        <rect x="20" y="150" width="130" height="150" rx="4" />
        <rect x="340" y="150" width="120" height="70" rx="4" />
        <rect x="340" y="250" width="120" height="50" rx="4" />
      </g>
      {/* Parcul */}
      <rect x="190" y="150" width="110" height="150" rx="4" fill="#D9E2D3" stroke={GREEN} strokeOpacity=".3" />
      <g fill="#B9C7BF">
        {[
          [215, 180],
          [270, 190],
          [230, 240],
          [280, 260],
          [210, 280],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="9" />
        ))}
      </g>
      <g stroke={PAPER} strokeWidth="12" strokeLinecap="round">
        <path d="M0 130h480M170 0v320M320 0v320" />
      </g>
      <g stroke={BRASS} strokeWidth=".8" strokeDasharray="6 6">
        <path d="M0 130h480M170 0v320M320 0v320" />
      </g>
      {/* Clădirea biroului */}
      <rect x="40" y="168" width="70" height="56" rx="3" fill={GREEN} stroke={INK} strokeWidth="1" />
      <path d="M48 176h54M48 184h54" stroke={BRASS} strokeOpacity=".7" />
      <g transform="translate(75 150)">
        <circle r="17" fill={PAPER} stroke={BRASS} strokeWidth="1.6" />
        <circle r="12" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="1.5 2" />
        <path d="M-6 -3h12M-4 -1v8M4 -1v8M-6 8h12" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M0 17v10" stroke={BRASS} strokeWidth="1.6" />
      </g>
    </svg>
  );
}
