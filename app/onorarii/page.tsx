import type { Metadata } from "next";
import { ContactStrip } from "@/components/ContactStrip";
import { FeeEstimator } from "@/components/FeeEstimator";
import { Notice } from "@/components/Notice";
import { PageHero } from "@/components/PageHero";
import { feeTable } from "@/data/fees";

export const metadata: Metadata = {
  title: "Onorarii și taxe",
  description: "Onorarii orientative și un estimator simplu pentru contractul de vânzare-cumpărare.",
};

export default function FeesPage() {
  return (
    <>
      <PageHero eyebrow="Onorarii și taxe" title="Cât costă, orientativ">
        <p>
          Onorariul notarial depinde de tipul actului și, pentru vânzări și donații, de valoarea bunului. Mai jos
          găsiți valori orientative și un estimator pentru contractul de vânzare-cumpărare.
        </p>
      </PageHero>

      <section className="section section--tight" aria-labelledby="estimator-titlu">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Estimator</p>
            <h2 id="estimator-titlu">Vânzare-cumpărare: onorariu și taxe</h2>
            <p className="muted">
              Introduceți valoarea din contract. Calculul include onorariul, TVA, taxa de carte funciară, costurile
              fixe ale dosarului și impozitul datorat de vânzător.
            </p>
          </div>
          <FeeEstimator />
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="tabel-titlu">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Tabel orientativ</p>
            <h2 id="tabel-titlu">Onorarii pentru alte acte</h2>
          </div>
          <div className="table-wrap" role="region" aria-labelledby="tabel-titlu" tabIndex={0}>
            <table className="fees">
              <caption className="visually-hidden">Onorarii orientative, fără TVA</caption>
              <thead>
                <tr>
                  <th scope="col">Act</th>
                  <th scope="col">Onorariu orientativ</th>
                  <th scope="col">Observații</th>
                </tr>
              </thead>
              <tbody>
                {feeTable.map((r) => (
                  <tr key={r.slug}>
                    <th scope="row">{r.label}</th>
                    <td>{r.fee}</td>
                    <td className="muted">{r.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small muted">Valorile din tabel nu includ TVA și eventualele taxe datorate altor instituții.</p>
          <Notice title="Important">
            <p>
              Toate cifrele de pe această pagină sunt orientative. Ele nu reprezintă o ofertă și nu înlocuiesc
              calculul făcut de birou pe baza documentelor. Vă comunicăm suma exactă înainte de semnare.
            </p>
          </Notice>
        </div>
      </section>
      <ContactStrip title="Doriți un calcul pentru situația dvs.?" />
    </>
  );
}
