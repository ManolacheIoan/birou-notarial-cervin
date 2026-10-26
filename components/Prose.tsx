/** Pagină de text lung (politici, termeni), cu lățime de lectură confortabilă. */
export function Prose({ children, updated }: { children: React.ReactNode; updated: string }) {
  return (
    <section className="section section--tight">
      <div className="container container--narrow">
        <div className="prose">
          <p className="prose__updated">Ultima actualizare: {updated}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
