"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarIcon, CheckIcon, PrintIcon, ServiceIcon } from "@/components/icons";
import { BUSINESS_NAME, site } from "@/config/site";
import { services, type ServiceSlug } from "@/data/services";
import { buildChecklist, documentsFor, fromQuery, progress, toQuery } from "@/lib/checklist";

const DEFAULT: ServiceSlug = "vanzare-cumparare";

/**
 * Lista interactivă: alegeți serviciul, bifați situațiile, apoi bifați actele
 * pe care le aveți deja. Starea serviciului și a situațiilor stă în adresa paginii.
 */
export function ChecklistTool() {
  const [slug, setSlug] = useState<string>(DEFAULT);
  const [situations, setSituations] = useState<string[]>([]);
  const [have, setHave] = useState<Set<string>>(new Set());
  const uid = useId();

  // Citește alegerea din adresă (ex. venind de pe pagina Servicii).
  useEffect(() => {
    const q = fromQuery(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronizare unică cu adresa
    if (q.slug) setSlug(q.slug);
    setSituations(q.situations);
  }, []);

  const list = useMemo(() => buildChecklist(slug, situations), [slug, situations]);
  const docs = documentsFor(slug);

  // Păstrează adresa la zi, ca lista să poată fi trimisă sau reluată.
  useEffect(() => {
    if (!list) return;
    const url = `${window.location.pathname}${toQuery(slug, list.situations)}`;
    window.history.replaceState(window.history.state, "", url);
  }, [slug, list]);

  if (!list || !docs) return null;
  const stat = progress(list, have);

  const chooseService = (next: string) => {
    setSlug(next);
    setSituations([]);
    setHave(new Set());
  };
  const toggleSituation = (id: string) =>
    setSituations((cur) => (cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id]));
  const toggleHave = (id: string) =>
    setHave((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="checklist">
      <div className="checklist__controls no-print">
        <fieldset className="field-group">
          <legend>1. Alegeți serviciul</legend>
          <div className="service-picker">
            {services.map((s) => (
              <label key={s.slug} className="service-option">
                <input
                  type="radio"
                  name={`${uid}-serviciu`}
                  value={s.slug}
                  checked={slug === s.slug}
                  onChange={() => chooseService(s.slug)}
                />
                <span className="service-option__box">
                  <ServiceIcon name={s.icon} size={22} />
                  <span>{s.name}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {docs.situations.length > 0 && (
          <fieldset className="field-group">
            <legend>2. Bifați ce se aplică în cazul dumneavoastră</legend>
            <div className="situations">
              {docs.situations.map((s) => (
                <label key={s.id} className="check">
                  <input type="checkbox" checked={situations.includes(s.id)} onChange={() => toggleSituation(s.id)} />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <section className="checklist__sheet" aria-labelledby={`${uid}-titlu`}>
        <header className="checklist__head">
          <div>
            <p className="eyebrow">Listă orientativă · {BUSINESS_NAME}</p>
            <h2 id={`${uid}-titlu`}>{list.service.name}</h2>
            {list.situations.length > 0 && (
              <p className="small muted">
                Situații alese:{" "}
                {list.situations.map((id) => docs.situations.find((s) => s.id === id)?.label).join("; ")}
              </p>
            )}
          </div>
          <p className="checklist__progress" aria-live="polite">
            <strong>
              {stat.done} din {stat.total}
            </strong>{" "}
            documente pregătite
          </p>
        </header>

        {list.groups.map((g) => (
          <div key={g.title} className="checklist__group">
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((item) => (
                <li key={item.id}>
                  <label className="doc-item">
                    <input type="checkbox" checked={have.has(item.id)} onChange={() => toggleHave(item.id)} />
                    <span className="doc-item__box" aria-hidden="true">
                      <CheckIcon size={14} />
                    </span>
                    <span>
                      {item.label}
                      {item.note && <span className="doc-item__note">{item.note}</span>}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="checklist__disclaimer">
          <strong>Ghid general, nu o listă definitivă.</strong> Documentele pot diferi în funcție de situația
          concretă. Vă rugăm să confirmați lista cu biroul înainte de programare: {site.phone}, {site.email}.
        </p>

        <div className="checklist__actions no-print">
          <button type="button" className="btn btn--green" onClick={() => window.print()}>
            <PrintIcon size={20} /> Tipărește lista
          </button>
          {!list.service.infoOnly && (
            <Link className="btn btn--primary" href={`/programari/?serviciu=${list.service.slug}`}>
              <CalendarIcon size={20} /> Programează-te
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
