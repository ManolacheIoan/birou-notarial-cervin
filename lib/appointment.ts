/**
 * Validarea cererii de programare. Funcții pure; „azi” se primește ca parametru,
 * ca testele să fie reproductibile.
 */
import { bookableServices } from "@/data/services";

export type AppointmentInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  day: string; // AAAA-LL-ZZ
  message: string;
  consent: boolean;
};

export type AppointmentErrors = Partial<Record<keyof AppointmentInput, string>>;

export const MAX_DAYS_AHEAD = 90;
export const MAX_MESSAGE = 1000;

/** Telefon românesc: 07xx xxx xxx, 02x/03x fix sau +40…; spațiile, punctele și cratimele se ignoră. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s.\-()]/g, "");
  const m = /^(?:\+40|0040|0)([237]\d{8})$/.exec(digits);
  return m ? `+40${m[1]}` : null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Data locală ca AAAA-LL-ZZ. */
export function isoDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function parseDay(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isoDay(d) === s ? d : null; // respinge 2026-02-30
}

export function validateAppointment(input: AppointmentInput, today: Date): AppointmentErrors {
  const e: AppointmentErrors = {};
  const name = input.name.trim();
  if (name.length < 3) e.name = "Scrieți numele și prenumele.";
  else if (name.length > 80) e.name = "Numele este prea lung.";

  if (!input.phone.trim()) e.phone = "Scrieți un număr de telefon, ca să vă putem confirma programarea.";
  else if (!normalizePhone(input.phone)) e.phone = "Numărul nu pare valid. Exemplu: 0722 123 456.";

  if (input.email.trim() && !EMAIL.test(input.email.trim())) e.email = "Adresa de e-mail nu pare validă.";

  if (!bookableServices.some((s) => s.slug === input.service)) e.service = "Alegeți serviciul.";

  if (!input.day) e.day = "Alegeți ziua preferată.";
  else {
    const d = parseDay(input.day);
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const last = new Date(start);
    last.setDate(last.getDate() + MAX_DAYS_AHEAD);
    if (!d) e.day = "Data nu este validă.";
    else if (d < start) e.day = "Alegeți o zi de azi încolo.";
    else if (d > last) e.day = `Putem programa cu cel mult ${MAX_DAYS_AHEAD} de zile înainte.`;
    else if (d.getDay() === 0) e.day = "Duminica biroul este închis. Alegeți altă zi.";
  }

  if (input.message.length > MAX_MESSAGE) e.message = `Mesajul poate avea cel mult ${MAX_MESSAGE} de caractere.`;
  if (!input.consent) e.consent = "Avem nevoie de acordul dumneavoastră ca să vă putem contacta.";
  return e;
}
