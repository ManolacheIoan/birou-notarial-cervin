/**
 * Serviciile notariale afișate pe site. Textele sunt generale, orientative,
 * fără trimiteri la articole de lege; cerințele exacte le confirmă biroul.
 */

export type ServiceSlug =
  | "vanzare-cumparare"
  | "donatie"
  | "testament"
  | "succesiune"
  | "procura"
  | "declaratie"
  | "legalizare-semnatura"
  | "traduceri-legalizate"
  | "ipoteca"
  | "contract-auto"
  | "redactare-acte";

export type IconName =
  | "house"
  | "gift"
  | "quill"
  | "scroll"
  | "key"
  | "document"
  | "stamp"
  | "translate"
  | "seal"
  | "car"
  | "handshake";

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** O frază, pentru carduri. */
  summary: string;
  /** Descriere pe înțeles, 2–3 fraze. */
  description: string;
  /** Durată estimativă, orientativă. */
  duration: string;
  icon: IconName;
  /** Doar informativ: nu se programează direct. */
  infoOnly?: boolean;
  /** Apare pe pagina Acasă. */
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "vanzare-cumparare",
    name: "Vânzare-cumpărare imobile",
    summary: "Apartamente, case și terenuri: verificăm actele și redactăm contractul.",
    description:
      "Vă ajutăm să parcurgeți vânzarea unui imobil de la verificarea actelor de proprietate până la semnarea contractului în formă autentică. Solicităm extrasul de carte funciară, redactăm contractul și vă explicăm fiecare clauză înainte de semnare.",
    duration: "1–3 zile lucrătoare pentru pregătire, aprox. 1 oră la semnare",
    icon: "house",
    featured: true,
  },
  {
    slug: "donatie",
    name: "Donații",
    summary: "Transmiterea unui bun către o persoană apropiată, în formă autentică.",
    description:
      "Donația este transmiterea unui bun fără plată, de regulă între membri ai familiei. Discutăm împreună ce bun se donează, dacă se dorește păstrarea unui drept de folosință și ce documente sunt necesare pentru fiecare parte.",
    duration: "1–3 zile lucrătoare pentru pregătire, aprox. 45 de minute la semnare",
    icon: "gift",
    featured: true,
  },
  {
    slug: "testament",
    name: "Testamente",
    summary: "Exprimarea clară a ultimelor voințe, cu discreție deplină.",
    description:
      "Un testament autentic exprimă voința dumneavoastră privind bunurile după deces. Discuția are loc confidențial, cu notarul, iar textul se redactează pe înțelesul dumneavoastră. Testamentul poate fi modificat sau revocat ulterior.",
    duration: "de regulă în aceeași zi, aprox. 30–45 de minute",
    icon: "quill",
    featured: true,
  },
  {
    slug: "succesiune",
    name: "Succesiuni (dezbateri succesorale)",
    summary: "Procedura prin care moștenitorii primesc certificatul de moștenitor.",
    description:
      "Dezbaterea succesorală stabilește cine sunt moștenitorii și ce bunuri rămân după o persoană decedată. Vă îndrumăm pas cu pas: ce acte de stare civilă și de proprietate sunt necesare, cine trebuie să fie prezent și cum decurg termenele.",
    duration: "de la câteva săptămâni, în funcție de complexitate și de documente",
    icon: "scroll",
    featured: true,
  },
  {
    slug: "procura",
    name: "Procuri",
    summary: "Împuterniciți pe cineva de încredere să vă reprezinte.",
    description:
      "Procura permite unei persoane de încredere să semneze sau să acționeze în numele dumneavoastră, pentru un act anume sau pentru o categorie de acte. Stabilim împreună limitele mandatului și durata acestuia.",
    duration: "de regulă în aceeași zi, aprox. 20–30 de minute",
    icon: "key",
    featured: true,
  },
  {
    slug: "declaratie",
    name: "Declarații",
    summary: "Declarații pe proprie răspundere, acorduri de călătorie și altele.",
    description:
      "Autentificăm declarații de diverse tipuri, de exemplu acordul părinților pentru călătoria unui minor sau declarații solicitate de alte instituții. Vă recomandăm să verificați dinainte ce formulare cere instituția care va primi declarația.",
    duration: "de regulă în aceeași zi, aprox. 15–20 de minute",
    icon: "document",
  },
  {
    slug: "legalizare-semnatura",
    name: "Legalizări de semnături",
    summary: "Confirmăm că semnătura de pe un înscris vă aparține.",
    description:
      "La legalizarea semnăturii, notarul confirmă identitatea persoanei care semnează în fața sa, nu conținutul documentului. Documentul se aduce nesemnat și se semnează la birou.",
    duration: "de regulă pe loc, aprox. 10–15 minute",
    icon: "stamp",
  },
  {
    slug: "traduceri-legalizate",
    name: "Traduceri legalizate",
    summary: "Informații despre legalizarea traducerilor realizate de traducători autorizați.",
    description:
      "Traducerea propriu-zisă o realizează un traducător autorizat; notarul legalizează semnătura traducătorului. Vă putem spune ce pași sunt de urmat și ce documente originale trebuie prezentate. Această secțiune are caracter informativ.",
    duration: "variabilă, în funcție de traducător și de volumul documentelor",
    icon: "translate",
    infoOnly: true,
  },
  {
    slug: "ipoteca",
    name: "Contracte de ipotecă",
    summary: "Garantarea unui credit cu un imobil, în coordonare cu banca.",
    description:
      "Contractul de ipotecă se încheie de regulă odată cu un credit bancar pentru locuință. Ne coordonăm cu banca pentru documentele necesare, astfel încât semnarea să aibă loc în aceeași zi cu vânzarea, atunci când este cazul.",
    duration: "2–5 zile lucrătoare pentru pregătire, aprox. 1 oră la semnare",
    icon: "seal",
  },
  {
    slug: "contract-auto",
    name: "Autentificări de contracte auto",
    summary: "Vânzarea unui autovehicul cu un contract verificat.",
    description:
      "Deși vânzarea unui autoturism se poate face și sub semnătură privată, forma autentică oferă claritate și siguranță ambelor părți. Verificăm actele mașinii și identitatea părților și redactăm contractul.",
    duration: "de regulă în aceeași zi, aprox. 30 de minute",
    icon: "car",
  },
  {
    slug: "redactare-acte",
    name: "Întocmirea actelor",
    summary: "Redactarea de contracte și înscrisuri adaptate situației dumneavoastră.",
    description:
      "Redactăm contracte de împrumut, de comodat, de partaj voluntar, convenții matrimoniale și alte înscrisuri. Începem cu o discuție despre ce doriți să obțineți, apoi vă propunem un text clar.",
    duration: "1–5 zile lucrătoare, în funcție de act",
    icon: "handshake",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Serviciile care se pot alege în formularul de programare. */
export const bookableServices = services.filter((s) => !s.infoOnly);
