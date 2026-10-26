import type { Metadata } from "next";
import Link from "next/link";
import { ContactStrip } from "@/components/ContactStrip";
import { ArrowIcon, CalendarIcon, ClockIcon, ServiceIcon } from "@/components/icons";
import { Notice } from "@/components/Notice";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/services";
import { buildChecklist, toQuery } from "@/lib/checklist";

export const metadata: Metadata = {
  title: "Servicii notariale",
  description: "Vânzări, donații, testamente, succesiuni, procuri, declarații, legalizări, ipoteci și contracte auto.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Servicii notariale" title="Ce acte întocmim">
        <p>
          Pentru fiecare serviciu găsiți o descriere pe înțeles, documentele de care este nevoie de obicei și o
          durată estimativă. Fiecare situație are particularitățile ei, așa că le confirmăm împreună.
        </p>
      </PageHero>

      <div className="container section--tight">
        <nav className="toc" aria-label="Servicii pe această pagină">
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`}>{s.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container service-list">
        {services.map((s) => {
          const base = buildChecklist(s.slug)!;
          const items = base.groups.flatMap((g) => g.items);
          return (
            <Reveal as="article" key={s.slug} className="service-entry">
              <div className="service-entry__head" id={s.slug}>
                <span className="service-card__icon">
                  <ServiceIcon name={s.icon} size={28} />
                </span>
                <div>
                  <h2>{s.name}</h2>
                  {s.infoOnly && <p className="tag">Doar informativ</p>}
                </div>
              </div>
              <div className="service-entry__body">
                <div>
                  <p>{s.description}</p>
                  <p className="service-entry__time">
                    <ClockIcon size={18} />
                    <span>
                      <strong>Durată estimativă:</strong> {s.duration}
                    </span>
                  </p>
                </div>
                <div className="service-entry__docs">
                  <h3>Documente necesare de obicei</h3>
                  <ul>
                    {items.slice(0, 5).map((i) => (
                      <li key={i.id}>{i.label}</li>
                    ))}
                  </ul>
                  <div className="service-entry__links">
                    <Link className="link-arrow" href={`/acte-necesare/${toQuery(s.slug, [])}`}>
                      <span>Lista completă, pe situația dvs.</span> <ArrowIcon size={18} />
                    </Link>
                    {!s.infoOnly && (
                      <Link className="btn btn--sm" href={`/programari/?serviciu=${s.slug}`}>
                        <CalendarIcon size={18} /> Programare
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
        <Notice>
          <p>
            Descrierile și listele de documente sunt orientative și nu țin loc de consultanță juridică. Cerințele
            finale le confirmă biroul, după ce cunoaște situația concretă.
          </p>
        </Notice>
      </div>
      <div className="section--tight" />
      <ContactStrip title="Nu știți ce serviciu vi se potrivește?" />
    </>
  );
}
