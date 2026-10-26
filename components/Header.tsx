"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/config/site";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape închide meniul și readuce focusul pe buton.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <nav id="meniu" className="nav" aria-label="Principal" data-open={open}>
          <ul className="nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  onClick={close}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__actions">
            <a className="btn btn--sm" href={`tel:${site.phoneHref}`}>
              <PhoneIcon size={18} /> {site.phone}
            </a>
            <Link href="/programari/" className="btn btn--primary btn--sm" onClick={close}>
              <CalendarIcon size={18} /> Programează-te
            </Link>
          </div>
        </nav>
        <Link
          href="/programari/"
          className="btn btn--primary btn--sm header-cta"
          aria-current={isCurrent(pathname, "/programari/") ? "page" : undefined}
        >
          Programează-te
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="meniu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="visually-hidden">Meniu</span>
        </button>
      </div>
    </header>
  );
}
