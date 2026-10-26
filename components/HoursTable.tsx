import { hours } from "@/config/site";

/** Programul săptămânal, ca tabel accesibil. */
export function HoursTable({ compact = false }: { compact?: boolean }) {
  return (
    <table className={`hours ${compact ? "hours--compact" : ""}`}>
      <caption className="visually-hidden">Programul de lucru</caption>
      <tbody>
        {hours.map((h) => (
          <tr key={h.day}>
            <th scope="row">{h.day}</th>
            <td>
              {h.open ? (
                <>
                  {h.open}–{h.close}
                </>
              ) : (
                <span className="muted">{h.note && !compact ? "Închis*" : "Închis"}</span>
              )}
              {!compact && h.note && h.open && <span className="hours__note"> · {h.note}</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
