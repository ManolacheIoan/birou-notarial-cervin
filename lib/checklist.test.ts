import { describe, expect, it } from "vitest";
import { documents } from "@/data/documents";
import { services } from "@/data/services";
import { buildChecklist, fromQuery, progress, toQuery } from "@/lib/checklist";

const ids = (slug: string, situations: string[] = []) =>
  buildChecklist(slug, situations)!.groups.flatMap((g) => g.items.map((i) => i.id));

describe("datele de documente", () => {
  it("fiecare serviciu are o listă și fiecare listă are un serviciu", () => {
    expect(documents.map((d) => d.slug).sort()).toEqual(services.map((s) => s.slug).sort());
  });

  it("orice condiție `when` trimite la o situație existentă a serviciului", () => {
    for (const d of documents) {
      const known = new Set(d.situations.map((s) => s.id));
      for (const item of d.groups.flatMap((g) => g.items)) {
        if (item.when) expect(known, `${d.slug}/${item.id}`).toContain(item.when);
      }
    }
  });

  it("fiecare listă de bază cere un act de identitate", () => {
    for (const d of documents) expect(ids(d.slug).some((id) => id.startsWith("act-identitate"))).toBe(true);
  });

  it("id-urile situațiilor sunt unice în cadrul unui serviciu", () => {
    for (const d of documents) {
      const list = d.situations.map((s) => s.id);
      expect(new Set(list).size, d.slug).toBe(list.length);
    }
  });
});

describe("buildChecklist", () => {
  it("serviciu necunoscut → null", () => {
    expect(buildChecklist("nu-exista")).toBeNull();
    expect(buildChecklist("")).toBeNull();
  });

  it("fără situații: doar documentele fără condiție", () => {
    const list = ids("vanzare-cumparare");
    expect(list).toContain("titlu-proprietate");
    expect(list).not.toContain("certificat-casatorie");
    expect(list).not.toContain("adeverinta-asociatie");
  });

  it("situațiile bifate adaugă documentele lor", () => {
    const list = ids("vanzare-cumparare", ["casatorit", "apartament"]);
    expect(list).toContain("certificat-casatorie");
    expect(list).toContain("adeverinta-asociatie");
    expect(list).not.toContain("acte-credit");
  });

  it("situațiile necunoscute sau de la alt serviciu se ignoră", () => {
    const list = buildChecklist("legalizare-semnatura", ["casatorit", "xyz"])!;
    expect(list.situations).toEqual([]);
    expect(list.total).toBe(2);
  });

  it("situațiile se păstrează în ordinea din date, fără dubluri", () => {
    const list = buildChecklist("vanzare-cumparare", ["credit", "casatorit", "credit"])!;
    expect(list.situations).toEqual(["casatorit", "credit"]);
  });

  it("grupurile goale dispar", () => {
    const list = buildChecklist("succesiune")!;
    expect(list.groups.map((g) => g.title)).not.toContain("Despre bunuri");
    const withHouse = buildChecklist("succesiune", ["imobile"])!;
    expect(withHouse.groups.map((g) => g.title)).toContain("Despre bunuri");
  });

  it("totalul corespunde numărului de documente afișate, fără dubluri", () => {
    for (const d of documents) {
      const all = d.situations.map((s) => s.id);
      const list = buildChecklist(d.slug, all)!;
      const flat = list.groups.flatMap((g) => g.items.map((i) => i.id));
      expect(new Set(flat).size, d.slug).toBe(flat.length);
      expect(list.total, d.slug).toBe(flat.length);
    }
  });
});

describe("progress", () => {
  it("numără doar documentele din lista curentă", () => {
    const list = buildChecklist("legalizare-semnatura")!;
    expect(progress(list, [])).toEqual({ done: 0, total: 2, complete: false });
    expect(progress(list, ["act-identitate-semnatar", "altceva"])).toEqual({ done: 1, total: 2, complete: false });
    expect(progress(list, new Set(["act-identitate-semnatar", "document-nesemnat"])).complete).toBe(true);
  });
});

describe("adresa paginii", () => {
  it("dus-întors", () => {
    const q = toQuery("donatie", ["casatorit", "rezerva-uzufruct"]);
    expect(q).toBe("?serviciu=donatie&situatii=casatorit%2Crezerva-uzufruct");
    expect(fromQuery(q)).toEqual({ slug: "donatie", situations: ["casatorit", "rezerva-uzufruct"] });
  });

  it("fără situații nu adaugă parametrul", () => {
    expect(toQuery("procura", [])).toBe("?serviciu=procura");
  });

  it("serviciu invalid sau lipsă → null", () => {
    expect(fromQuery("?serviciu=hack").slug).toBeNull();
    expect(fromQuery("").slug).toBeNull();
    expect(fromQuery("?serviciu=procura&situatii=,, ,").situations).toEqual([]);
  });
});
