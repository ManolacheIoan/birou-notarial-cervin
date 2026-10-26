"use client";

import { useId, useState } from "react";
import { saleFeeConfig } from "@/data/fees";
import { estimateSale, formatLei, parseAmount, type FeeLine } from "@/lib/fees";

const EXAMPLE = "350.000";

function Rows({ lines }: { lines: FeeLine[] }) {
  return (
    <>
      {lines.map((l) => (
        <tr key={l.id}>
          <th scope="row">
            {l.label}
            {l.note && <span className="estimate__note">{l.note}</span>}
          </th>
          <td>{formatLei(l.amount)}</td>
        </tr>
      ))}
    </>
  );
}

/** Estimator orientativ pentru vânzare-cumpărare, după regulile din data/fees.ts. */
export function FeeEstimator() {
  const id = useId();
  const [raw, setRaw] = useState(EXAMPLE);
  const [shortHold, setShortHold] = useState(false);

  const trimmed = raw.trim();
  const result = trimmed ? estimateSale(parseAmount(trimmed), { shortHold }) : null;
  const error = result && !result.ok ? result.message : null;

  return (
    <div className="estimator">
      <form className="estimator__form" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="field">
          <label htmlFor={`${id}-valoare`}>Valoarea din contract (lei)</label>
          <div className="input-suffix">
            <input
              id={`${id}-valoare`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={`${id}-ajutor${error ? ` ${id}-eroare` : ""}`}
            />
            <span aria-hidden="true">lei</span>
          </div>
          <p id={`${id}-ajutor`} className="field__hint">
            De exemplu 350.000 sau 350000. Valoare maximă: {formatLei(saleFeeConfig.maxValue, 0)}.
          </p>
          {error && (
            <p id={`${id}-eroare`} className="field__error">
              {error}
            </p>
          )}
        </div>
        <label className="check">
          <input type="checkbox" checked={shortHold} onChange={(e) => setShortHold(e.target.checked)} />
          <span>Vânzătorul deține imobilul de mai puțin de {saleFeeConfig.transferTax.thresholdYears} ani</span>
        </label>
      </form>

      <div className="estimator__result" aria-live="polite">
        {!result && <p className="muted">Introduceți valoarea pentru a vedea estimarea.</p>}
        {result?.ok && (
          <>
            <p className="estimator__total">
              <span>Total orientativ</span>
              <strong>{formatLei(result.total)}</strong>
            </p>
            <table className="estimate">
              <caption className="visually-hidden">
                Estimare orientativă pentru o vânzare de {formatLei(result.value)}
              </caption>
              <tbody>
                <tr className="estimate__group">
                  <th colSpan={2} scope="colgroup">
                    De regulă, achitate de cumpărător
                  </th>
                </tr>
                <Rows lines={result.lines.filter((l) => l.payer === "cumparator")} />
                <tr className="estimate__sum">
                  <th scope="row">Subtotal cumpărător</th>
                  <td>{formatLei(result.buyerTotal)}</td>
                </tr>
                <tr className="estimate__group">
                  <th colSpan={2} scope="colgroup">
                    De regulă, achitate de vânzător
                  </th>
                </tr>
                <Rows lines={result.lines.filter((l) => l.payer === "vanzator")} />
                <tr className="estimate__sum">
                  <th scope="row">Subtotal vânzător</th>
                  <td>{formatLei(result.sellerTotal)}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        <p className="estimator__disclaimer">
          Cifrele sunt orientative și nu reprezintă o ofertă. Suma exactă depinde de documente, de situația
          părților și de alte costuri care pot apărea, și o comunicăm după verificarea dosarului.
        </p>
      </div>
    </div>
  );
}
