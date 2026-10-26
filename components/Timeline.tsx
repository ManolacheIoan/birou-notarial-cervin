"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon, ServiceIcon } from "@/components/icons";
import type { ProcedureStep } from "@/data/procedure";

/**
 * Cronologia procedurii: pe măsură ce derulați, linia se umple și fiecare pas
 * se „sigilează”. Fără JavaScript sau cu mișcare redusă, totul e vizibil de la început.
 */
export function Timeline({ steps }: { steps: ProcedureStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setReached(items.length - 1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            setReached((r) => Math.max(r, i));
          }
        }
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = steps.length > 1 ? Math.max(0, reached) / (steps.length - 1) : 1;

  return (
    <ol
      ref={ref}
      className="timeline"
      data-started={reached >= 0}
      style={{ "--progress": progress } as React.CSSProperties}
    >
      {steps.map((s, i) => (
        <li key={s.id} className="timeline__step" data-step={i} data-reached={i <= reached}>
          <span className="timeline__node" aria-hidden="true">
            <svg className="timeline__ring" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="34" pathLength={1} />
            </svg>
            {s.icon === "calendar" ? <CalendarIcon size={26} /> : <ServiceIcon name={s.icon} size={26} />}
          </span>
          <div className="timeline__card">
            <p className="timeline__index">Pasul {i + 1}</p>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <dl className="timeline__meta">
              <div>
                <dt>Ce aveți de făcut</dt>
                <dd>{s.you}</dd>
              </div>
              <div>
                <dt>Durată orientativă</dt>
                <dd>{s.time}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
