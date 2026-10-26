import type { Metadata } from "next";
import Link from "next/link";
import { HoursTable } from "@/components/HoursTable";
import { CalendarIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { ArtPanel } from "@/components/illustrations/Guilloche";
import { StreetPlan } from "@/components/illustrations/Scenes";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_NAME, hours, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Program și contact",
  description: "Telefon, e-mail, adresă și programul biroului.",
};

export default function ContactPage() {
  const closedNote = hours.find((h) => !h.open && h.note);
  return (
    <>
      <PageHero eyebrow="Program și contact" title="Ne găsiți ușor">
        <p>Sunați-ne în timpul programului sau scrieți-ne. Răspundem la mesaje în cel mult {site.responseTime}.</p>
      </PageHero>
      <section className="section section--tight">
        <div className="container contact-grid">
          <div className="contact-cards">
            <div className="card contact-card">
              <PhoneIcon size={26} />
              <div>
                <h2 className="h3">Telefon</h2>
                <p>
                  <a className="contact-card__big" href={`tel:${site.phoneHref}`}>
                    {site.phone}
                  </a>
                </p>
                <p className="small muted">Programări și întrebări despre acte.</p>
              </div>
            </div>
            <div className="card contact-card">
              <MailIcon size={26} />
              <div>
                <h2 className="h3">E-mail</h2>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <p className="small muted">Nu trimiteți copii ale actelor de identitate prin e-mail necriptat.</p>
              </div>
            </div>
            <div className="card contact-card">
              <PinIcon size={26} />
              <div>
                <h2 className="h3">Adresă</h2>
                <address>
                  {BUSINESS_NAME}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.area}
                </address>
                <p className="small muted">{site.address.note}</p>
              </div>
            </div>
            <div className="card contact-card">
              <ClockIcon size={26} />
              <div>
                <h2 className="h3">Program</h2>
                <HoursTable />
                {closedNote && (
                  <p className="small muted">
                    * {closedNote.day}: {closedNote.note}.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="contact-side">
            <figure className="contact-map">
              <ArtPanel id="g-map">
                <StreetPlan />
              </ArtPanel>
              <figcaption>Plan schematic: biroul se află la colțul străzii, lângă parc.</figcaption>
            </figure>
            <Link className="btn btn--primary" href="/programari/">
              <CalendarIcon size={20} /> Cerere de programare
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
