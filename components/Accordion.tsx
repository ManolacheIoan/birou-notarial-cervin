"use client";

import { useId, useState } from "react";
import { ChevronIcon } from "@/components/icons";

/**
 * Acordeon accesibil: fiecare întrebare e un buton într-un titlu (h2),
 * cu aria-expanded și aria-controls. Panourile închise au atributul `hidden`.
 */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const id = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) =>
    setOpen((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className="accordion__item" data-open={isOpen}>
            <h2 className="accordion__heading">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <ChevronIcon size={22} />
              </button>
            </h2>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} hidden={!isOpen} className="accordion__panel">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
