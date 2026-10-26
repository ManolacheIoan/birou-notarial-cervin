/**
 * Lista de documente pentru un serviciu și un set de situații bifate.
 * Funcții pure, fără DOM: ușor de testat și de refolosit.
 */
import { documents, type DocGroup, type ServiceDocuments } from "@/data/documents";
import { serviceBySlug, type Service } from "@/data/services";

export type Checklist = {
  service: Service;
  /** Situațiile valide, în ordinea din date. */
  situations: string[];
  groups: DocGroup[];
  total: number;
};

export function documentsFor(slug: string): ServiceDocuments | undefined {
  return documents.find((d) => d.slug === slug);
}

/**
 * Construiește lista: păstrează documentele fără condiție și pe cele ale căror
 * situații sunt bifate; elimină grupurile goale și dublurile (același id).
 * Întoarce `null` pentru un serviciu necunoscut. Situațiile necunoscute se ignoră.
 */
export function buildChecklist(slug: string, selected: readonly string[] = []): Checklist | null {
  const service = serviceBySlug(slug);
  const docs = documentsFor(slug);
  if (!service || !docs) return null;

  const valid = docs.situations.map((s) => s.id).filter((id) => selected.includes(id));
  const seen = new Set<string>();
  const groups: DocGroup[] = [];
  for (const group of docs.groups) {
    const items = group.items.filter((item) => {
      if (item.when && !valid.includes(item.when)) return false;
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    if (items.length) groups.push({ title: group.title, items });
  }
  return { service, situations: valid, groups, total: seen.size };
}

/** Câte documente din listă sunt bifate (id-urile care nu mai sunt în listă nu contează). */
export function progress(list: Checklist, checked: ReadonlySet<string> | readonly string[]) {
  const set = checked instanceof Set ? checked : new Set(checked);
  const ids = list.groups.flatMap((g) => g.items.map((i) => i.id));
  const done = ids.filter((id) => set.has(id)).length;
  return { done, total: ids.length, complete: ids.length > 0 && done === ids.length };
}

/** Starea în adresa paginii, ca lista să poată fi trimisă sau tipărită: ?serviciu=…&situatii=a,b */
export function toQuery(slug: string, situations: readonly string[]): string {
  const params = new URLSearchParams({ serviciu: slug });
  if (situations.length) params.set("situatii", situations.join(","));
  return `?${params.toString()}`;
}

export function fromQuery(search: string): { slug: string | null; situations: string[] } {
  const params = new URLSearchParams(search);
  const slug = params.get("serviciu");
  const situations = (params.get("situatii") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return { slug: slug && documentsFor(slug) ? slug : null, situations };
}
