/**
 * Adaptorul care trimite cererea de programare. Contract simplu:
 *   send(cerere) → { status: "sent" } | { status: "not-sent" } | { status: "error", message }
 *
 * - Fără NEXT_PUBLIC_APPOINTMENT_ENDPOINT (demo): nu se trimite nimic, nicăieri.
 * - Cu endpoint (ex. Formspree, https://formspree.io/f/xxxx sau un serviciu propriu
 *   de e-mail): POST JSON către adresa respectivă.
 */
import { appointmentEndpoint } from "@/config/site";
import type { AppointmentInput } from "@/lib/appointment";

export type SendResult = { status: "sent" } | { status: "not-sent" } | { status: "error"; message: string };

export interface AppointmentAdapter {
  readonly mode: "demo" | "http";
  send(data: AppointmentInput & { serviceName: string }): Promise<SendResult>;
}

export const demoAdapter: AppointmentAdapter = {
  mode: "demo",
  async send() {
    return { status: "not-sent" };
  },
};

export function httpAdapter(endpoint: string, fetchImpl: typeof fetch = fetch): AppointmentAdapter {
  return {
    mode: "http",
    async send(data) {
      try {
        const res = await fetchImpl(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            nume: data.name,
            telefon: data.phone,
            email: data.email || undefined,
            serviciu: data.serviceName,
            zi_preferata: data.day,
            mesaj: data.message || undefined,
            _subject: `Cerere de programare: ${data.serviceName}`,
          }),
        });
        if (!res.ok) return { status: "error", message: `Serverul a răspuns cu ${res.status}.` };
        return { status: "sent" };
      } catch {
        return { status: "error", message: "Nu există conexiune la internet sau serverul nu răspunde." };
      }
    },
  };
}

export function getAdapter(endpoint = appointmentEndpoint): AppointmentAdapter {
  return endpoint ? httpAdapter(endpoint) : demoAdapter;
}
