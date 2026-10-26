import type { Metadata } from "next";
import { ContactStrip } from "@/components/ContactStrip";
import { ArtPanel } from "@/components/illustrations/Guilloche";
import { SigningScene } from "@/components/illustrations/Scenes";
import { Notice } from "@/components/Notice";
import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { procedure } from "@/data/procedure";

export const metadata: Metadata = {
  title: "Cum decurge o procedură",
  description: "Programare, documente, redactare, semnare, eliberare: pașii unei proceduri notariale.",
};

export default function ProcedurePage() {
  return (
    <>
      <PageHero
        eyebrow="Cum decurge o procedură"
        title="De la primul telefon la actul semnat"
        art={
          <ArtPanel id="g-proc" className="art-panel--wide">
            <SigningScene />
          </ArtPanel>
        }
      >
        <p>
          Cinci pași, explicați pe scurt. Exemplul este o vânzare de imobil; la alte acte unii pași sunt mai
          scurți sau lipsesc.
        </p>
      </PageHero>
      <section className="section">
        <div className="container container--narrow">
          <Timeline steps={procedure} />
          <Notice>
            <p>
              Duratele sunt orientative și depind de documente și de alte instituții implicate. Vă spunem la
              programare ce termene sunt probabile în cazul dumneavoastră.
            </p>
          </Notice>
        </div>
      </section>
      <ContactStrip title="Începem cu primul pas?" />
    </>
  );
}
