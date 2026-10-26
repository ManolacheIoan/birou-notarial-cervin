import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { BUSINESS_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Termeni",
  description: "Condițiile de folosire a site-ului.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Termeni" title="Termeni de folosire a site-ului" />
      <Prose updated="26 octombrie 2026">
        <h2>Despre acest site</h2>
        <p>
          Site-ul prezintă serviciile oferite de {BUSINESS_NAME} și vă ajută să vă pregătiți pentru o
          programare. Folosindu-l, acceptați termenii de mai jos.
        </p>

        <h2>Informații generale, nu consultanță</h2>
        <p>
          Textele, listele de documente și răspunsurile la întrebări au caracter general. Ele nu reprezintă
          consultanță juridică și nu țin cont de situația dumneavoastră concretă. Cerințele finale pentru fiecare
          act le confirmă biroul.
        </p>

        <h2>Estimări de cost</h2>
        <p>
          Onorariile și taxele afișate, inclusiv rezultatele estimatorului, sunt orientative. Nu reprezintă o
          ofertă fermă și nu creează obligații. Suma exactă se comunică după verificarea documentelor, înainte de
          semnare.
        </p>

        <h2>Cereri de programare</h2>
        <p>
          O cerere trimisă prin site nu este o programare confirmată. Programarea devine fixă doar după ce vă
          contactăm și stabilim împreună ziua și ora. Pentru situații urgente, vă rugăm să sunați la{" "}
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
        </p>

        <h2>Fără garanții privind rezultatul</h2>
        <p>
          Duratele afișate sunt estimative și pot depinde de alte instituții sau de documentele disponibile. Nu
          putem garanta un anumit termen sau un anumit rezultat prin informațiile de pe site.
        </p>

        <h2>Conținut și ilustrații</h2>
        <p>
          Textele, ilustrațiile, sigiliul și iconițele de pe site sunt create pentru {BUSINESS_NAME}. Nu le
          reproduceți fără acord scris.
        </p>

        <h2>Modificări</h2>
        <p>Putem actualiza acești termeni. Versiunea în vigoare este cea publicată pe această pagină.</p>
      </Prose>
    </>
  );
}
