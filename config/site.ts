/**
 * Configurarea biroului. Numele afacerii apare DOAR aici:
 * schimbă BUSINESS_NAME și tot site-ul se actualizează.
 * Toate datele (persoane, adrese, telefoane, înregistrări) sunt fictive.
 */
export const BUSINESS_NAME = "Birou Notarial Cervin";

/** Numele scurt, folosit în logo și în bara mobilă (cuvântul de după „Birou Notarial”). */
export const BUSINESS_SHORT = BUSINESS_NAME.replace(/^Birou Notarial\s+/i, "") || BUSINESS_NAME;

export const site = {
  tagline: "acte autentice, explicate pe înțeles",
  shortDescription:
    "birou notarial pentru vânzări, donații, succesiuni, procuri, testamente și legalizări. Programări telefonic sau online.",
  phone: "0371 284 937",
  /** Format internațional pentru linkurile tel: */
  phoneHref: "+40371284937",
  email: "secretariat@notarcervin.ro",
  area: "România",
  address: {
    street: "Strada Teilor nr. 14, parter",
    city: "Municipiul de reședință",
    note: "Intrare din curtea interioară, acces fără trepte.",
  },
  registration: {
    authorization: "Autorizație de funcționare nr. 1847/2014",
    taxId: "CIF 34 518 270",
  },
  /** Răspundem la mesaje în (zile lucrătoare). */
  responseTime: "o zi lucrătoare",
} as const;

export type DayHours = { day: string; short: string; open?: string; close?: string; note?: string };

/** Programul de lucru. Ziua 0 = luni (ordinea afișării). Lipsa orelor = închis. */
export const hours: DayHours[] = [
  { day: "Luni", short: "Lu", open: "09:00", close: "17:00" },
  { day: "Marți", short: "Ma", open: "09:00", close: "17:00" },
  { day: "Miercuri", short: "Mi", open: "09:00", close: "18:00", note: "program prelungit" },
  { day: "Joi", short: "Jo", open: "09:00", close: "17:00" },
  { day: "Vineri", short: "Vi", open: "09:00", close: "15:00" },
  { day: "Sâmbătă", short: "Sâ", note: "doar cu programare, pentru situații urgente" },
  { day: "Duminică", short: "Du" },
];

export const nav = [
  { href: "/", label: "Acasă" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/acte-necesare/", label: "Acte necesare" },
  { href: "/onorarii/", label: "Onorarii" },
  { href: "/procedura/", label: "Procedura" },
  { href: "/echipa/", label: "Echipa" },
  { href: "/contact/", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/programari/", label: "Programări" },
  { href: "/intrebari-frecvente/", label: "Întrebări frecvente" },
  { href: "/confidentialitate/", label: "Confidențialitate și cookie-uri" },
  { href: "/termeni/", label: "Termeni" },
] as const;

/**
 * Adresa la care formularul de programare trimite datele (ex. Formspree).
 * Se setează la build: NEXT_PUBLIC_APPOINTMENT_ENDPOINT=https://formspree.io/f/xxxx
 * Fără ea, formularul nu trimite nimic și spune asta deschis.
 */
export const appointmentEndpoint = process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT ?? "";
