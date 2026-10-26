import { InfoIcon } from "@/components/icons";

/** Casetă de avertizare: informații generale, de confirmat cu biroul. */
export function Notice({ children, title = "Informații generale" }: { children: React.ReactNode; title?: string }) {
  return (
    <aside className="notice" aria-label={title}>
      <InfoIcon size={22} />
      <div>
        <p className="notice__title">{title}</p>
        <div className="notice__body">{children}</div>
      </div>
    </aside>
  );
}
