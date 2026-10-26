import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { EmptyRegisterScene } from "@/components/illustrations/Scenes";

export const metadata: Metadata = { title: "Pagină negăsită" };

const links = [
  { href: "/servicii/", label: "Servicii notariale" },
  { href: "/acte-necesare/", label: "Acte necesare" },
  { href: "/onorarii/", label: "Onorarii și taxe" },
  { href: "/contact/", label: "Program și contact" },
];

export default function NotFound() {
  return (
    <section className="section lost">
      <div className="container lost__inner">
        <div>
          <p className="eyebrow">Eroare 404</p>
          <h1>Această pagină nu figurează în registru.</h1>
          <p className="lead">
            Adresa poate fi greșită sau pagina a fost mutată. Nimic nu s-a pierdut: puteți continua de aici.
          </p>
          <Link className="btn btn--green" href="/">
            Înapoi la prima pagină
          </Link>
          <ul className="lost__links">
            {links.map((l) => (
              <li key={l.href}>
                <Link className="link-arrow" href={l.href}>
                  <span>{l.label}</span> <ArrowIcon size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="art-panel lost__art" aria-hidden="true">
          <EmptyRegisterScene />
        </div>
      </div>
    </section>
  );
}
