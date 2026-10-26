/** Antetul paginilor interioare: supratitlu, titlu, introducere și o ilustrație opțională. */
export function PageHero({
  eyebrow,
  title,
  children,
  art,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  art?: React.ReactNode;
}) {
  return (
    <section className={`page-hero ${art ? "page-hero--art" : ""}`}>
      <div className="container page-hero__inner">
        <div className="page-hero__text">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {children && <div className="lead">{children}</div>}
        </div>
        {art && <div className="page-hero__art" aria-hidden="true">{art}</div>}
      </div>
    </section>
  );
}
