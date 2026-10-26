/**
 * Liste GENERALE de documente, pe servicii. Sunt orientative: biroul confirmă
 * lista exactă după ce cunoaște situația concretă.
 *
 * Un document cu `when` apare doar dacă utilizatorul bifează situația respectivă.
 */
import type { ServiceSlug } from "@/data/services";

export type Situation = { id: string; label: string };

export type DocItem = {
  id: string;
  label: string;
  /** Explicație scurtă, opțională. */
  note?: string;
  /** Id-ul situației care face documentul necesar. Lipsă = apare mereu. */
  when?: string;
};

export type DocGroup = { title: string; items: DocItem[] };

export type ServiceDocuments = {
  slug: ServiceSlug;
  situations: Situation[];
  groups: DocGroup[];
};

const ID = (who: string): DocItem => ({
  id: `act-identitate-${who}`,
  label: "Act de identitate valabil (carte de identitate sau pașaport)",
});

const married: Situation = { id: "casatorit", label: "Una dintre părți este căsătorită" };
const proxy: Situation = { id: "reprezentare", label: "Una dintre părți va fi reprezentată prin procură" };
const company: Situation = { id: "firma", label: "Una dintre părți este o firmă" };

const marriedDoc: DocItem = {
  id: "certificat-casatorie",
  label: "Certificat de căsătorie (și, dacă există, convenția matrimonială)",
  when: married.id,
};
const proxyDoc: DocItem = {
  id: "procura-autentica",
  label: "Procura în original, în formă autentică, pentru persoana reprezentată",
  note: "Verificăm dinainte dacă procura acoperă actul respectiv.",
  when: proxy.id,
};
const companyDoc: DocItem = {
  id: "acte-firma",
  label: "Actele firmei: certificat de înregistrare, certificat constatator recent, hotărârea asociaților",
  when: company.id,
};

export const documents: ServiceDocuments[] = [
  {
    slug: "vanzare-cumparare",
    situations: [
      married,
      proxy,
      company,
      { id: "apartament", label: "Imobilul este un apartament într-un bloc cu asociație" },
      { id: "credit", label: "Cumpărătorul folosește un credit bancar" },
      { id: "ipoteca-existenta", label: "Imobilul are deja o ipotecă sau o sarcină" },
    ],
    groups: [
      { title: "Pentru vânzător și cumpărător", items: [ID("parti"), marriedDoc, proxyDoc, companyDoc] },
      {
        title: "Despre imobil",
        items: [
          {
            id: "titlu-proprietate",
            label: "Actul de proprietate al vânzătorului (contract, certificat de moștenitor, hotărâre etc.)",
          },
          {
            id: "documentatie-cadastrala",
            label: "Documentația cadastrală: plan de amplasament și încheierea de intabulare, dacă există",
          },
          {
            id: "certificat-fiscal",
            label: "Certificat de atestare fiscală pentru imobil, de la primăria localității",
            note: "Atestă că impozitele pe imobil sunt plătite.",
          },
          { id: "certificat-energetic", label: "Certificat de performanță energetică a imobilului" },
          {
            id: "extras-cf",
            label: "Extras de carte funciară pentru autentificare",
            note: "De regulă îl solicită biroul, nu trebuie adus.",
          },
          {
            id: "adeverinta-asociatie",
            label: "Adeverință de la asociația de proprietari că nu există datorii la întreținere",
            when: "apartament",
          },
          {
            id: "acte-credit",
            label: "Documentele de la bancă: aprobarea creditului și raportul de evaluare",
            when: "credit",
          },
          {
            id: "acord-creditor",
            label: "Acordul creditorului pentru vânzare sau dovada stingerii datoriei",
            when: "ipoteca-existenta",
          },
        ],
      },
    ],
  },
  {
    slug: "donatie",
    situations: [married, proxy, { id: "rezerva-uzufruct", label: "Donatorul dorește să păstreze dreptul de folosință" }],
    groups: [
      {
        title: "Pentru donator și donatar",
        items: [
          ID("parti"),
          {
            id: "dovada-rudenie",
            label: "Certificate de naștere sau de căsătorie care arată legătura de rudenie, dacă există",
          },
          marriedDoc,
          proxyDoc,
        ],
      },
      {
        title: "Despre bunul donat",
        items: [
          { id: "titlu-proprietate", label: "Actul de proprietate al bunului donat" },
          { id: "documentatie-cadastrala", label: "Documentația cadastrală, dacă bunul este un imobil" },
          { id: "certificat-fiscal", label: "Certificat de atestare fiscală de la primăria localității" },
          { id: "certificat-energetic", label: "Certificat de performanță energetică, pentru imobile" },
          {
            id: "detalii-uzufruct",
            label: "Precizări despre dreptul de folosință păstrat (pe viață sau pe o perioadă)",
            note: "Se discută cu notarul la redactare.",
            when: "rezerva-uzufruct",
          },
        ],
      },
    ],
  },
  {
    slug: "testament",
    situations: [{ id: "bunuri-precizate", label: "Doriți să menționați bunuri anume în testament" }],
    groups: [
      {
        title: "Pentru testator",
        items: [
          ID("testator"),
          {
            id: "date-beneficiari",
            label: "Numele complete ale persoanelor pe care doriți să le menționați",
          },
          {
            id: "acte-bunuri",
            label: "Acte sau date de identificare ale bunurilor menționate (adresă, număr cadastral)",
            when: "bunuri-precizate",
          },
        ],
      },
    ],
  },
  {
    slug: "succesiune",
    situations: [
      { id: "testament-existent", label: "Persoana decedată a lăsat un testament" },
      { id: "imobile", label: "Moștenirea include imobile" },
      { id: "vehicule", label: "Moștenirea include autovehicule" },
      { id: "conturi", label: "Moștenirea include conturi bancare" },
      proxy,
    ],
    groups: [
      {
        title: "Despre persoana decedată",
        items: [
          { id: "certificat-deces", label: "Certificatul de deces" },
          {
            id: "certificat-fiscal-defunct",
            label: "Certificat de atestare fiscală pe numele persoanei decedate, de la primărie",
          },
          { id: "testament-original", label: "Testamentul, dacă există, în original", when: "testament-existent" },
        ],
      },
      {
        title: "Pentru moștenitori",
        items: [
          ID("mostenitori"),
          {
            id: "acte-stare-civila",
            label: "Certificate de naștere și de căsătorie care dovedesc legătura cu persoana decedată",
          },
          proxyDoc,
        ],
      },
      {
        title: "Despre bunuri",
        items: [
          {
            id: "acte-imobile",
            label: "Actele de proprietate ale imobilelor și documentația cadastrală",
            when: "imobile",
          },
          {
            id: "acte-vehicule",
            label: "Cartea de identitate și certificatul de înmatriculare ale vehiculului",
            when: "vehicule",
          },
          { id: "extrase-cont", label: "Extrase sau adeverințe de la bancă privind conturile", when: "conturi" },
        ],
      },
    ],
  },
  {
    slug: "procura",
    situations: [{ id: "procura-imobil", label: "Procura privește un imobil anume" }],
    groups: [
      {
        title: "Pentru cel care dă procura",
        items: [
          ID("mandant"),
          {
            id: "date-mandatar",
            label: "Datele complete ale persoanei împuternicite (nume, CNP, adresă din actul de identitate)",
          },
          { id: "descriere-mandat", label: "Descrierea clară a actelor pe care le poate face persoana împuternicită" },
          {
            id: "date-imobil",
            label: "Datele imobilului: adresă, număr cadastral, număr de carte funciară",
            when: "procura-imobil",
          },
        ],
      },
    ],
  },
  {
    slug: "declaratie",
    situations: [{ id: "minor", label: "Declarația privește un minor (de exemplu, o călătorie)" }],
    groups: [
      {
        title: "Pentru declarant",
        items: [
          ID("declarant"),
          {
            id: "text-cerut",
            label: "Formularul sau cerințele instituției care va primi declarația, dacă există",
          },
          {
            id: "acte-minor",
            label: "Certificatul de naștere al minorului și datele însoțitorului, dacă este cazul",
            when: "minor",
          },
        ],
      },
    ],
  },
  {
    slug: "legalizare-semnatura",
    situations: [],
    groups: [
      {
        title: "Pentru semnatar",
        items: [
          ID("semnatar"),
          {
            id: "document-nesemnat",
            label: "Documentul de semnat, NESEMNAT, în numărul de exemplare necesar",
            note: "Semnătura se dă în fața notarului.",
          },
        ],
      },
    ],
  },
  {
    slug: "traduceri-legalizate",
    situations: [],
    groups: [
      {
        title: "Informativ",
        items: [
          ID("solicitant"),
          { id: "document-original", label: "Documentul original care urmează să fie tradus" },
          {
            id: "traducere",
            label: "Traducerea realizată de un traducător autorizat, semnată de acesta",
          },
        ],
      },
    ],
  },
  {
    slug: "ipoteca",
    situations: [married, proxy],
    groups: [
      { title: "Pentru părți", items: [ID("parti"), marriedDoc, proxyDoc] },
      {
        title: "De la bancă și despre imobil",
        items: [
          { id: "contract-credit", label: "Contractul de credit sau aprobarea finală a băncii" },
          { id: "raport-evaluare", label: "Raportul de evaluare a imobilului" },
          { id: "titlu-proprietate", label: "Actul de proprietate și documentația cadastrală a imobilului" },
          {
            id: "extras-cf",
            label: "Extras de carte funciară pentru autentificare",
            note: "De regulă îl solicită biroul.",
          },
        ],
      },
    ],
  },
  {
    slug: "contract-auto",
    situations: [married, proxy, company],
    groups: [
      { title: "Pentru vânzător și cumpărător", items: [ID("parti"), marriedDoc, proxyDoc, companyDoc] },
      {
        title: "Despre vehicul",
        items: [
          { id: "civ", label: "Cartea de identitate a vehiculului, în original" },
          { id: "certificat-inmatriculare", label: "Certificatul de înmatriculare, în original" },
          {
            id: "certificat-fiscal-auto",
            label: "Certificat de atestare fiscală pentru vehicul, de la primăria vânzătorului",
          },
        ],
      },
    ],
  },
  {
    slug: "redactare-acte",
    situations: [married, proxy, company],
    groups: [
      {
        title: "Pentru părți",
        items: [
          ID("parti"),
          {
            id: "descriere-situatie",
            label: "O scurtă descriere a ceea ce doriți să cuprindă actul",
          },
          { id: "acte-relevante", label: "Documentele legate de bunurile sau sumele menționate în act" },
          marriedDoc,
          proxyDoc,
          companyDoc,
        ],
      },
    ],
  },
];
