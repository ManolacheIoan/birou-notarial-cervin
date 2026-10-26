import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { BUSINESS_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate și cookie-uri",
  description: "Cum tratăm datele personale, documentele încredințate și ce cookie-uri folosim.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Confidențialitate" title="Politica de confidențialitate și cookie-uri">
        <p>Pe scurt: colectăm doar ce ne trebuie ca să vă programăm și să întocmim actele, și păstrăm totul confidențial.</p>
      </PageHero>
      <Prose updated="26 octombrie 2026">
        <h2>Cine suntem</h2>
        <p>
          Operatorul datelor este {BUSINESS_NAME}, cu sediul în {site.address.street}, {site.area}. Ne puteți
          contacta la <a href={`mailto:${site.email}`}>{site.email}</a> sau la{" "}
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a> pentru orice întrebare despre datele dumneavoastră.
        </p>

        <h2>Ce date colectăm prin site</h2>
        <p>Prin formularul de programare ne puteți transmite:</p>
        <ul>
          <li>numele și prenumele;</li>
          <li>numărul de telefon și, opțional, adresa de e-mail;</li>
          <li>serviciul dorit, ziua preferată și un mesaj opțional.</li>
        </ul>
        <p>
          Vă rugăm să nu scrieți în formular date sensibile, precum codul numeric personal sau seria actului de
          identitate. Acestea se verifică doar la birou, pe baza documentelor originale.
        </p>

        <h2>De ce folosim datele</h2>
        <ul>
          <li>ca să vă contactăm pentru confirmarea programării, pe baza acordului dumneavoastră;</li>
          <li>ca să pregătim dosarul și actele solicitate;</li>
          <li>ca să ne îndeplinim obligațiile legale care decurg din activitatea notarială.</li>
        </ul>
        <p>Nu folosim datele pentru publicitate și nu le vindem sau închiriem nimănui.</p>

        <h2>Confidențialitatea documentelor</h2>
        <p>
          Tot ce ne încredințați, documente și discuții, este acoperit de obligația de confidențialitate a
          biroului. Concret:
        </p>
        <ul>
          <li>documentele originale vă sunt restituite după verificare;</li>
          <li>copiile și exemplarele care trebuie păstrate stau în arhiva biroului, într-un spațiu securizat;</li>
          <li>accesul la dosare îl au doar persoanele din birou care lucrează la ele;</li>
          <li>
            informațiile se comunică altor instituții doar atunci când acest lucru este cerut de lege pentru
            actul respectiv (de exemplu, pentru înscrierea în cartea funciară);
          </li>
          <li>vă recomandăm să nu trimiteți copii ale actelor de identitate prin e-mail necriptat.</li>
        </ul>

        <h2>Cât timp păstrăm datele</h2>
        <p>
          Datele din cererile de programare se păstrează cât este necesar pentru programare și, dacă nu se
          încheie niciun act, se șterg în cel mult șase luni. Actele notariale și documentele aferente se
          păstrează în arhivă pe durata cerută de reglementările profesionale.
        </p>

        <h2>Drepturile dumneavoastră</h2>
        <p>
          Puteți cere accesul la datele dumneavoastră, corectarea sau ștergerea lor (în limitele permise de
          obligațiile de arhivare), restricționarea prelucrării și vă puteți retrage acordul oricând. Dacă
          considerați că datele nu au fost tratate corect, vă puteți adresa autorității naționale de
          supraveghere a protecției datelor.
        </p>

        <h2>Cookie-uri și stocare locală</h2>
        <p>
          Site-ul nu folosește cookie-uri, nu include scripturi de analiză sau de publicitate și nu încarcă
          resurse de pe alte servere (fonturi, hărți, rețele sociale). Bifele din lista de acte necesare și
          calculele din estimator rămân doar în pagina deschisă și dispar când o închideți.
        </p>

        <h2>Modificări</h2>
        <p>
          Putem actualiza această politică atunci când se schimbă modul în care lucrăm. Data ultimei actualizări
          apare la începutul paginii.
        </p>
      </Prose>
    </>
  );
}
