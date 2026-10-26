import Link from "next/link";
import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";

/** Bara fixă de jos, doar pe telefon (ascunsă din CSS pe ecrane mari). */
export function MobileCallBar() {
  return (
    <div className="callbar">
      <a className="btn" href={`tel:${site.phoneHref}`}>
        <PhoneIcon size={20} /> Sună
      </a>
      <Link className="btn btn--primary" href="/programari/">
        <CalendarIcon size={20} /> Programează-te
      </Link>
    </div>
  );
}
