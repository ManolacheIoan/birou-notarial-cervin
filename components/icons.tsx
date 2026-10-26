/**
 * Iconițe originale, desenate cu linie fină (24×24, contur 1,5).
 * Toate sunt decorative (aria-hidden); textul alăturat poartă sensul.
 */
import type { IconName } from "@/data/services";

type P = { className?: string; size?: number };

function Svg({ children, className, size = 24 }: P & { children: React.ReactNode }) {
  return (
    <svg
      className={`icon ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ——— Iconițe tematice ——— */

export const HouseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5.8 9.4V20h12.4V9.4" />
    <path d="M10 20v-5.2h4V20" />
    <path d="M15.8 6.2V4.5h1.8v3.2" />
  </Svg>
);

export const GiftIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.8" y="8.8" width="16.4" height="4" rx=".6" />
    <path d="M5.3 12.8V20h13.4v-7.2M12 8.8V20" />
    <path d="M12 8.8C10.8 6 7.6 5.3 7.4 7.3c-.2 1.6 2.6 1.5 4.6 1.5Zm0 0c1.2-2.8 4.4-3.5 4.6-1.5.2 1.6-2.6 1.5-4.6 1.5Z" />
  </Svg>
);

export const QuillIcon = (p: P) => (
  <Svg {...p}>
    <path d="M20.5 3.5C13.5 4 8.6 9 7.2 16.8" />
    <path d="M20.5 3.5c-.8 5.6-4.6 10-11.1 11.6" />
    <path d="M7.2 16.8 4.5 20.5M11 11.6l3.4-.5M9.4 14l2.8-.3" />
  </Svg>
);

export const ScrollIcon = (p: P) => (
  <Svg {...p}>
    <path d="M8 4h10a2 2 0 0 1 0 4h-1.5" />
    <path d="M8 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9.2a1.8 1.8 0 0 0 1.8-1.8V8" />
    <path d="M8 20a2 2 0 0 0 2-2v-1H5.5" />
    <path d="M9.5 10.5h5.5M9.5 13.5h5.5M12 16.5h3" />
  </Svg>
);

export const KeyIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="8" cy="15.5" r="3.8" />
    <circle cx="8" cy="15.5" r="1" />
    <path d="M10.8 12.8 19.5 4M16.2 7.3l2.2 2.2M13.9 9.7l1.6 1.6" />
  </Svg>
);

export const DocumentIcon = (p: P) => (
  <Svg {...p}>
    <path d="M14 3H7.2A1.2 1.2 0 0 0 6 4.2v15.6A1.2 1.2 0 0 0 7.2 21h3.6" />
    <path d="M14 3l4 4v6.5M14 3v4h4" />
    <path d="M8.8 9.5h5M8.8 12.5h6" />
    <circle cx="15.5" cy="16.2" r="2.6" />
    <path d="M14.2 18.5 13.4 22l2.1-1 2.1 1-.8-3.5" />
  </Svg>
);

export const StampIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="5" r="2.2" />
    <path d="M10.8 7v3.5M13.2 7v3.5" />
    <path d="M6.2 10.5h11.6a1.5 1.5 0 0 1 1.5 1.5v2.6H4.7V12a1.5 1.5 0 0 1 1.5-1.5Z" />
    <path d="M5.6 14.6v1.6h12.8v-1.6M4 20h16" />
  </Svg>
);

export const SealIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="9.5" r="6" />
    <circle cx="12" cy="9.5" r="3.3" strokeDasharray="1.2 1.4" />
    <path d="M9.4 14.9 8.3 21l2.6-1.4M14.6 14.9l1.1 6.1-2.6-1.4" />
  </Svg>
);

export const TranslateIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 5.5h8.5M7.7 3.5v2M5.6 5.5c.5 3 2.6 5.5 5.2 6.6M9.8 5.5c-.5 3-2.6 5.5-5.4 6.6" />
    <path d="M12.8 20.5l3.6-8.5 3.6 8.5M14.1 17.6h4.6" />
  </Svg>
);

export const CarIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 16v-3.2l1.9-4.3a2 2 0 0 1 1.8-1.2h7.6a2 2 0 0 1 1.8 1.2l1.9 4.3V16" />
    <path d="M3.5 16h17v1.8a.7.7 0 0 1-.7.7H4.2a.7.7 0 0 1-.7-.7Z" />
    <path d="M4.8 12.8h14.4M10 16h4" />
    <circle cx="7.8" cy="15.5" r=".6" />
    <circle cx="16.2" cy="15.5" r=".6" />
  </Svg>
);

export const HandshakeIcon = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 11.5 6 8l3.4 1.3" />
    <path d="M21.5 11.5 18 8l-4.1 1.1-4.3 3.2a1.3 1.3 0 0 0 1.6 2.1l2.7-1.6" />
    <path d="m6 13.6 4.4 4a1.3 1.3 0 0 0 1.9-1.8M9.1 14.9l3.4 3a1.3 1.3 0 0 0 1.9-1.8L12.2 14M13.9 13.2l3 2.6a1.3 1.3 0 0 0 1.6-2l-.6-.7" />
  </Svg>
);

/* ——— Iconițe de interfață ——— */

export const PhoneIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6.6 3.5h2.6l1.4 4-1.9 1.3a11 11 0 0 0 6.5 6.5l1.3-1.9 4 1.4v2.6a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  </Svg>
);
export const CalendarIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="1.6" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
  </Svg>
);
export const ClockIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.2V12l3.2 2" />
  </Svg>
);
export const PinIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Svg>
);
export const MailIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
    <path d="m4 6.5 8 6.2 8-6.2" />
  </Svg>
);
export const MenuIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);
export const CloseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const CheckIcon = (p: P) => (
  <Svg {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Svg>
);
export const PrintIcon = (p: P) => (
  <Svg {...p}>
    <path d="M7 8.5V3.5h10v5" />
    <rect x="3.5" y="8.5" width="17" height="8" rx="1.6" />
    <path d="M7 14h10v6.5H7z" />
    <path d="M16.5 11.5h.5" />
  </Svg>
);
export const ArrowIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />
  </Svg>
);
export const ChevronIcon = (p: P) => (
  <Svg {...p}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </Svg>
);
export const InfoIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5M12 7.8v.1" />
  </Svg>
);
export const ShieldIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
);

const byName: Record<IconName, (p: P) => React.ReactElement> = {
  house: HouseIcon,
  gift: GiftIcon,
  quill: QuillIcon,
  scroll: ScrollIcon,
  key: KeyIcon,
  document: DocumentIcon,
  stamp: StampIcon,
  seal: SealIcon,
  translate: TranslateIcon,
  car: CarIcon,
  handshake: HandshakeIcon,
};

export function ServiceIcon({ name, ...p }: P & { name: IconName }) {
  const Icon = byName[name];
  return <Icon {...p} />;
}
