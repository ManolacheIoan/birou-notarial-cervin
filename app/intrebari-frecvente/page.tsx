import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { ContactStrip } from "@/components/ContactStrip";
import { PageHero } from "@/components/PageHero";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri generale despre programări, acte, onorarii și confidențialitate.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Întrebări frecvente" title="Răspunsuri pe scurt">
        <p>
          Cele mai des întâlnite întrebări de la telefon. Răspunsurile sunt generale; pentru situația
          dumneavoastră, vă lămurim la birou.
        </p>
      </PageHero>
      <section className="section section--tight">
        <div className="container container--narrow">
          <Accordion items={faq} />
        </div>
      </section>
      <ContactStrip title="Nu ați găsit răspunsul?" />
    </>
  );
}
