"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { BUSINESS_NAME, site } from "@/config/site";
import { bookableServices, serviceBySlug } from "@/data/services";
import {
  MAX_DAYS_AHEAD,
  MAX_MESSAGE,
  isoDay,
  validateAppointment,
  type AppointmentErrors,
  type AppointmentInput,
} from "@/lib/appointment";
import { getAdapter, type SendResult } from "@/lib/appointment-adapter";

const EMPTY: AppointmentInput = { name: "", phone: "", email: "", service: "", day: "", message: "", consent: false };
const ORDER: (keyof AppointmentInput)[] = ["name", "phone", "email", "service", "day", "message", "consent"];

type Phase = { kind: "edit" } | { kind: "sending" } | { kind: "done"; result: SendResult; data: AppointmentInput };

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long" }).format(new Date(y, m - 1, d));
}

export function AppointmentForm() {
  const id = useId();
  const adapter = getAdapter();
  const [values, setValues] = useState<AppointmentInput>(EMPTY);
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>({ kind: "edit" });
  const [range, setRange] = useState<{ min?: string; max?: string }>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  // Serviciul din adresă (?serviciu=…) și intervalul de zile, calculate în browser.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("serviciu");
    const today = new Date();
    const last = new Date(today);
    last.setDate(last.getDate() + MAX_DAYS_AHEAD);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valori disponibile doar în browser
    setRange({ min: isoDay(today), max: isoDay(last) });
    if (slug && bookableServices.some((s) => s.slug === slug)) setValues((v) => ({ ...v, service: slug }));
  }, []);

  useEffect(() => {
    if (phase.kind === "done") resultRef.current?.focus();
  }, [phase]);

  const fid = (k: keyof AppointmentInput) => `${id}-${k}`;
  const set = <K extends keyof AppointmentInput>(k: K, v: AppointmentInput[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    // După prima încercare, erorile se actualizează pe loc.
    if (submitted) setErrors(validateAppointment(next, new Date()));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateAppointment(values, new Date());
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setPhase({ kind: "sending" });
    const serviceName = serviceBySlug(values.service)?.name ?? values.service;
    const result = await adapter.send({ ...values, serviceName });
    setPhase({ kind: "done", result, data: values });
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
    setPhase({ kind: "edit" });
  }

  if (phase.kind === "done") {
    const { result, data } = phase;
    const serviceName = serviceBySlug(data.service)?.name ?? "";
    const mailBody = [
      `Bună ziua,`,
      ``,
      `Aș dori o programare pentru: ${serviceName}.`,
      `Ziua preferată: ${formatDay(data.day)}.`,
      `Nume: ${data.name}`,
      `Telefon: ${data.phone}`,
      data.message ? `Mesaj: ${data.message}` : "",
    ]
      .filter((l) => l !== "")
      .join("\n");
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Programare: ${serviceName}`)}&body=${encodeURIComponent(mailBody)}`;

    return (
      <div className="form-result" data-status={result.status}>
        {result.status === "sent" && (
          <>
            <h2 ref={resultRef} tabIndex={-1}>
              Cererea a fost trimisă
            </h2>
            <p>
              Mulțumim, {data.name.split(" ")[0]}. Vă sunăm în cel mult {site.responseTime} ca să confirmăm ora.
              Programarea este fixă doar după confirmarea noastră.
            </p>
          </>
        )}
        {result.status === "not-sent" && (
          <>
            <h2 ref={resultRef} tabIndex={-1}>
              Cererea este pregătită, dar nu a fost trimisă
            </h2>
            <p>
              Formularul online nu transmite deocamdată cererile către birou, așa că datele dumneavoastră nu
              au ajuns la noi. Ca să fixăm programarea, sunați-ne sau trimiteți-ne e-mailul de mai jos, deja
              completat.
            </p>
          </>
        )}
        {result.status === "error" && (
          <>
            <h2 ref={resultRef} tabIndex={-1}>
              Cererea nu a putut fi trimisă
            </h2>
            <p>
              {result.message} Vă rugăm să ne sunați sau să ne scrieți; datele dumneavoastră nu s-au pierdut, sunt
              în e-mailul pregătit mai jos.
            </p>
          </>
        )}
        <dl className="form-result__summary">
          <div>
            <dt>Serviciu</dt>
            <dd>{serviceName}</dd>
          </div>
          <div>
            <dt>Ziua preferată</dt>
            <dd>{formatDay(data.day)}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd>{data.phone}</dd>
          </div>
        </dl>
        <div className="form-result__actions">
          <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
            <PhoneIcon size={20} /> Sună la {site.phone}
          </a>
          {result.status !== "sent" && (
            <a className="btn" href={mailto}>
              <MailIcon size={20} /> Trimite e-mailul pregătit
            </a>
          )}
          <button type="button" className="btn" onClick={reset}>
            Completează din nou
          </button>
        </div>
      </div>
    );
  }

  const errorList = ORDER.filter((k) => errors[k]);
  const describe = (k: keyof AppointmentInput, hint?: boolean) =>
    [hint ? `${fid(k)}-hint` : "", errors[k] ? `${fid(k)}-err` : ""].filter(Boolean).join(" ") || undefined;
  const err = (k: keyof AppointmentInput) =>
    errors[k] ? (
      <p id={`${fid(k)}-err`} className="field__error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form className="appointment" onSubmit={onSubmit} noValidate aria-label={`Cerere de programare la ${BUSINESS_NAME}`}>
      {errorList.length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert">
          <p className="error-summary__title">Verificați {errorList.length === 1 ? "câmpul" : "câmpurile"}:</p>
          <ul>
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${fid(k)}`}>{errors[k]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="appointment__grid">
        <div className="field">
          <label htmlFor={fid("name")}>Nume și prenume</label>
          <input
            id={fid("name")}
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            required
          />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor={fid("phone")}>Telefon</label>
          <input
            id={fid("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describe("phone", true)}
            required
          />
          <p id={`${fid("phone")}-hint`} className="field__hint">
            Vă sunăm pentru confirmare.
          </p>
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor={fid("email")}>
            E-mail <span className="field__optional">(opțional)</span>
          </label>
          <input
            id={fid("email")}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
          />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor={fid("service")}>Serviciu</label>
          <select
            id={fid("service")}
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describe("service")}
            required
          >
            <option value="">Alegeți…</option>
            {bookableServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
          {err("service")}
        </div>
        <div className="field">
          <label htmlFor={fid("day")}>Ziua preferată</label>
          <input
            id={fid("day")}
            type="date"
            min={range.min}
            max={range.max}
            value={values.day}
            onChange={(e) => set("day", e.target.value)}
            aria-invalid={errors.day ? true : undefined}
            aria-describedby={describe("day", true)}
            required
          />
          <p id={`${fid("day")}-hint`} className="field__hint">
            Luni–sâmbătă. Ora exactă o stabilim la telefon.
          </p>
          {err("day")}
        </div>
        <div className="field field--wide">
          <label htmlFor={fid("message")}>
            Mesaj <span className="field__optional">(opțional)</span>
          </label>
          <textarea
            id={fid("message")}
            value={values.message}
            maxLength={MAX_MESSAGE + 200}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describe("message", true)}
          />
          <p id={`${fid("message")}-hint`} className="field__hint">
            Pe scurt, despre ce este vorba. Nu scrieți aici date sensibile (CNP, serii de acte).{" "}
            <span aria-live="polite">
              {values.message.length}/{MAX_MESSAGE}
            </span>
          </p>
          {err("message")}
        </div>
      </div>

      <div className="field">
        <label className="check check--plain" htmlFor={fid("consent")}>
          <input
            id={fid("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describe("consent")}
          />
          <span>
            Sunt de acord să fiu contactat(ă) pentru programare. Detalii în{" "}
            <a href="/confidentialitate/">politica de confidențialitate</a>.
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="appointment__submit">
        <button type="submit" className="btn btn--green" disabled={phase.kind === "sending"}>
          <CalendarIcon size={20} /> {phase.kind === "sending" ? "Se trimite…" : "Trimite cererea"}
        </button>
        <p className="small muted">
          Preferați telefonul? <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </p>
      </div>
    </form>
  );
}
