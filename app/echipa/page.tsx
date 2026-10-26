import type { Metadata } from "next";
import { ContactStrip } from "@/components/ContactStrip";
import { StaffFigure } from "@/components/illustrations/Figure";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { staff } from "@/data/staff";

export const metadata: Metadata = {
  title: "Echipa",
  description: "Notarul public, notarul asociat și colegii care pregătesc dosarele.",
};

export default function TeamPage() {
  const leads = staff.filter((s) => s.lead);
  const others = staff.filter((s) => !s.lead);
  return (
    <>
      <PageHero eyebrow="Echipa" title="Cine vă primește la birou">
        <p>
          Actele le semnează notarul public sau notarul asociat. Dosarele le pregătesc colegii din birou, care vă
          pot răspunde la telefon la majoritatea întrebărilor despre documente și programări.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="notari">
        <div className="container">
          <h2 id="notari" className="visually-hidden">
            Notari
          </h2>
          <ul className="people people--lead">
            {leads.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 120} className="person">
                <div className="person__art">
                  <StaffFigure kind={p.figure} />
                </div>
                <div className="person__text">
                  <p className="person__role">{p.role}</p>
                  <h3>{p.name}</h3>
                  <p>{p.bio}</p>
                  <ul className="person__tags" aria-label={`Specialități ${p.name}`}>
                    {p.specialties.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="birou">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Biroul</p>
            <h2 id="birou">Colegii care pregătesc dosarele</h2>
          </div>
          <ul className="people">
            {others.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 100} className="person person--small">
                <div className="person__art">
                  <StaffFigure kind={p.figure} />
                </div>
                <div className="person__text">
                  <p className="person__role">{p.role}</p>
                  <h3>{p.name}</h3>
                  <p>{p.bio}</p>
                  <ul className="person__tags" aria-label={`Specialități ${p.name}`}>
                    {p.specialties.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <ContactStrip title="Doriți să vorbiți cu cineva din echipă?" />
    </>
  );
}
