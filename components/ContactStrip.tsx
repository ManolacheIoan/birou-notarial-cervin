import Link from "next/link";
import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";

/** Banda de contact de la finalul paginilor. */
export function ContactStrip({ title = "Aveți o întrebare despre acte?" }: { title?: string }) {
  return (
    <section className="contact-strip" aria-labelledby="contact-strip-title">
      <div className="container contact-strip__inner">
        <div>
          <h2 id="contact-strip-title">{title}</h2>
          <p>
            Sunați-ne sau programați-vă online. Vă spunem ce documente să pregătiți, ca să nu faceți drumuri în
            plus.
          </p>
        </div>
        <div className="contact-strip__actions">
          <a className="btn btn--ghost-light" href={`tel:${site.phoneHref}`}>
            <PhoneIcon size={20} /> {site.phone}
          </a>
          <Link className="btn btn--primary" href="/programari/">
            <CalendarIcon size={20} /> Programează-te
          </Link>
        </div>
      </div>
    </section>
  );
}
