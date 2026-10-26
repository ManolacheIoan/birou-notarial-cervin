import Link from "next/link";
import { ContactStrip } from "@/components/ContactStrip";
import { ArrowIcon, CalendarIcon, CheckIcon, ClockIcon, DocumentIcon, ServiceIcon, ShieldIcon } from "@/components/icons";
import { StaffFigure } from "@/components/illustrations/Figure";
import { ArtPanel } from "@/components/illustrations/Guilloche";
import { StampScene } from "@/components/illustrations/Scenes";
import { Reveal } from "@/components/Reveal";
import { hours } from "@/config/site";
import { services } from "@/data/services";
import { staff } from "@/data/staff";
import { buildChecklist, toQuery } from "@/lib/checklist";

const steps = [
  {
    title: "Ne spuneți despre ce este vorba",
    text: "La telefon sau printr-o programare online. Vă spunem ce acte să pregătiți pentru situația dumneavoastră.",
  },
  {
    title: "Pregătim dosarul",
    text: "Verificăm documentele, solicităm extrasele necesare și redactăm actul. Vă trimitem proiectul, dacă doriți să-l citiți dinainte.",
  },
  {
    title: "Semnați, liniștit",
    text: "Notarul citește actul împreună cu dumneavoastră și răspunde la întrebări. Semnați doar când totul este clar.",
  },
];

export default function Home() {
  const featured = services.filter((s) => s.featured);
  const preview = buildChecklist("vanzare-cumparare")!;
  const previewItems = preview.groups.flatMap((g) => g.items).slice(0, 4);
  const leads = staff.filter((s) => s.lead);
  const weekdays = hours.filter((h) => h.open);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <h1>
              Acte autentice, întocmite cu grijă și <em>explicate pe înțeles</em>.
            </h1>
            <p className="lead">
              Vânzări, donații, succesiuni, procuri și testamente. Vă spunem dinainte ce documente sunt necesare
              și citim împreună fiecare act înainte de semnare.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" href="/programari/">
                <CalendarIcon size={20} /> Programează-te
              </Link>
              <Link className="btn" href="/acte-necesare/">
                <DocumentIcon size={20} /> Vezi actele necesare
              </Link>
            </div>
            <ul className="hero__facts">
              <li>
                <ClockIcon size={18} /> Luni–vineri, de la {weekdays[0].open}
              </li>
              <li>
                <ShieldIcon size={18} /> Confidențialitate deplină
              </li>
            </ul>
          </div>
          <ArtPanel id="g-hero" className="hero__art">
            <StampScene />
          </ArtPanel>
        </div>
      </section>

      <section className="section" aria-labelledby="servicii-titlu">
        <div className="container">
          <div className="section__head section__head--split">
            <div>
              <p className="eyebrow">Servicii notariale</p>
              <h2 id="servicii-titlu">Cele mai frecvente acte</h2>
            </div>
            <Link className="link-arrow" href="/servicii/">
              <span>Toate serviciile</span> <ArrowIcon size={18} />
            </Link>
          </div>
          <ul className="service-grid">
            {featured.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 70} className="service-card">
                <span className="service-card__icon">
                  <ServiceIcon name={s.icon} size={28} />
                </span>
                <h3>
                  <Link href={`/servicii/#${s.slug}`}>{s.name}</Link>
                </h3>
                <p>{s.summary}</p>
                <p className="service-card__time">
                  <ClockIcon size={16} /> {s.duration}
                </p>
              </Reveal>
            ))}
            <Reveal as="li" delay={featured.length * 70} className="service-card service-card--more">
              <p>Declarații, legalizări de semnătură, contracte auto, ipoteci și redactarea altor acte.</p>
              <Link className="link-arrow" href="/servicii/">
                <span>Vezi lista completă</span> <ArrowIcon size={18} />
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="cum-lucram">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Cum lucrăm</p>
            <h2 id="cum-lucram">Trei pași, fără drumuri inutile</h2>
          </div>
          <ol className="steps3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 120} className="steps3__item">
                <span className="steps3__num" aria-hidden="true">
                  {["I", "II", "III"][i]}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Link className="link-arrow" href="/procedura/">
            <span>Cum decurge o procedură, pas cu pas</span> <ArrowIcon size={18} />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="acte-titlu">
        <div className="container teaser">
          <div>
            <p className="eyebrow">Acte necesare</p>
            <h2 id="acte-titlu">Lista de documente, înainte să veniți</h2>
            <p className="lead">
              Alegeți serviciul, bifați situația dumneavoastră și primiți o listă generală pe care o puteți tipări.
              Lista finală o confirmăm împreună.
            </p>
            <ul className="chips">
              {services
                .filter((s) => s.featured)
                .map((s) => (
                  <li key={s.slug}>
                    <Link className="chip" href={`/acte-necesare/${toQuery(s.slug, [])}`}>
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <Reveal className="paper-card" as="figure">
            <figcaption className="paper-card__title">
              Exemplu: {preview.service.name.toLowerCase()}
            </figcaption>
            <ul className="paper-card__list">
              {previewItems.map((item) => (
                <li key={item.id}>
                  <span className="paper-card__box" aria-hidden="true">
                    <CheckIcon size={14} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            <Link className="link-arrow" href={`/acte-necesare/${toQuery("vanzare-cumparare", [])}`}>
              <span>Lista completă ({preview.total} documente)</span> <ArrowIcon size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="echipa-titlu">
        <div className="container team-teaser">
          <div>
            <p className="eyebrow">Echipa</p>
            <h2 id="echipa-titlu">Oameni care au răbdare cu întrebările</h2>
            <p className="lead">
              Un notar public, un notar asociat și trei colegi care pregătesc dosarele. Știți mereu cu cine
              vorbiți.
            </p>
            <Link className="link-arrow" href="/echipa/">
              <span>Cunoașteți echipa</span> <ArrowIcon size={18} />
            </Link>
          </div>
          <ul className="team-teaser__list">
            {leads.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 120} className="person-mini">
                <StaffFigure kind={p.figure} />
                <p className="person-mini__name">{p.name}</p>
                <p className="person-mini__role">{p.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
