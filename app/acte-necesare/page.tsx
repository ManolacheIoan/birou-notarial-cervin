import type { Metadata } from "next";
import { ChecklistTool } from "@/components/ChecklistTool";
import { ContactStrip } from "@/components/ContactStrip";
import { Notice } from "@/components/Notice";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Acte necesare",
  description: "Listă generală de documente pentru fiecare serviciu notarial, pe care o puteți tipări.",
};

export default function DocumentsPage() {
  return (
    <>
      <PageHero eyebrow="Acte necesare" title="Ce documente să pregătiți">
        <p>
          Alegeți serviciul și bifați situațiile care vi se aplică. Primiți o listă generală, pe care o puteți
          bifa pe măsură ce strângeți actele și o puteți tipări.
        </p>
      </PageHero>
      <div className="container section--tight">
        <Notice title="Ghid general">
          <p>
            Listele sunt orientative. Fiecare dosar are particularitățile lui, de aceea cerințele finale le
            confirmă biroul, la telefon sau la programare.
          </p>
        </Notice>
      </div>
      <div className="container">
        <ChecklistTool />
      </div>
      <div className="section--tight" />
      <ContactStrip title="Nu sunteți sigur ce acte vi se cer?" />
    </>
  );
}
