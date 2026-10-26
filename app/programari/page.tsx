import type { Metadata } from "next";
import Link from "next/link";
import { AppointmentForm } from "@/components/AppointmentForm";
import { HoursTable } from "@/components/HoursTable";
import { DocumentIcon, PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { hours, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Programări",
  description: "Cerere de programare online sau telefonic, cu confirmare de la birou.",
};

export default function AppointmentsPage() {
  const closedNote = hours.find((h) => !h.open && h.note);
  return (
    <>
      <PageHero eyebrow="Programări" title="Cerere de programare">
        <p>
          Completați formularul și vă sunăm pentru a stabili ora. Dacă preferați, ne puteți suna direct în
          timpul programului.
        </p>
      </PageHero>
      <section className="section section--tight">
        <div className="container appointment-layout">
          <AppointmentForm />
          <aside className="appointment-aside" aria-label="Alte moduri de programare">
            <div className="card">
              <h2 className="h3">Programare telefonică</h2>
              <p className="muted">Cea mai rapidă cale, în timpul programului.</p>
              <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
                <PhoneIcon size={20} /> {site.phone}
              </a>
            </div>
            <div className="card">
              <h2 className="h3">Program</h2>
              <HoursTable />
              {closedNote && (
                <p className="small muted">
                  * {closedNote.day}: {closedNote.note}.
                </p>
              )}
            </div>
            <div className="card">
              <h2 className="h3">Înainte să veniți</h2>
              <p className="muted">Verificați lista generală de documente pentru serviciul dorit.</p>
              <Link className="link-arrow" href="/acte-necesare/">
                <DocumentIcon size={18} /> <span>Acte necesare</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
