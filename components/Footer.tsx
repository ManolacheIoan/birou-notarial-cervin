import Link from "next/link";
import { HoursTable } from "@/components/HoursTable";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { SealMark } from "@/components/Logo";
import { BUSINESS_NAME, footerNav, nav, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <SealMark size={64} />
          <p className="site-footer__name">{BUSINESS_NAME}</p>
          <p className="site-footer__tag">Acte autentice, explicate pe înțeles. Cu discreție și răbdare.</p>
          <p className="site-footer__legal">
            {site.registration.authorization}
            <br />
            {site.registration.taxId}
          </p>
        </div>
        <div>
          <h2 className="site-footer__title">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <PhoneIcon size={18} /> <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            </li>
            <li>
              <MailIcon size={18} /> <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <PinIcon size={18} />
              <span>
                {site.address.street}, {site.area}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="site-footer__title">Program</h2>
          <HoursTable compact />
        </div>
        <nav aria-label="Subsol">
          <h2 className="site-footer__title">Pagini</h2>
          <ul className="site-footer__links">
            {[...nav.slice(1), ...footerNav].map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {BUSINESS_NAME}. Informațiile de pe site au caracter general și nu
          reprezintă consultanță juridică.
        </p>
      </div>
    </footer>
  );
}
