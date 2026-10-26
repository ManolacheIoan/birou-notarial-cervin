import { describe, expect, it } from "vitest";
import { isoDay, normalizePhone, validateAppointment, type AppointmentInput } from "@/lib/appointment";

const TODAY = new Date(2026, 10, 2, 10, 0); // luni, 2 noiembrie 2026
const ok: AppointmentInput = {
  name: "Ana Pop",
  phone: "0722 123 456",
  email: "",
  service: "procura",
  day: "2026-11-03",
  message: "",
  consent: true,
};
const errs = (patch: Partial<AppointmentInput>) => validateAppointment({ ...ok, ...patch }, TODAY);

describe("normalizePhone", () => {
  it.each([
    ["0722 123 456", "+40722123456"],
    ["0722-123-456", "+40722123456"],
    ["+40 722 123 456", "+40722123456"],
    ["0040722123456", "+40722123456"],
    ["021 312 34 56", "+40213123456"],
    ["0371 284 937", "+40371284937"],
  ])("%s → %s", (a, b) => expect(normalizePhone(a)).toBe(b));
  it.each(["", "123", "0822123456", "07221234567", "+44 7700 900123", "07a2123456"])("%s invalid", (a) =>
    expect(normalizePhone(a)).toBeNull(),
  );
});

describe("validateAppointment", () => {
  it("o cerere completă nu are erori", () => {
    expect(errs({})).toEqual({});
    expect(errs({ email: "ana@exemplu.ro", message: "Vânzare apartament" })).toEqual({});
  });
  it("câmpuri obligatorii", () => {
    const e = validateAppointment(
      { name: "", phone: "", email: "", service: "", day: "", message: "", consent: false },
      TODAY,
    );
    expect(Object.keys(e).sort()).toEqual(["consent", "day", "name", "phone", "service"]);
  });
  it("e-mailul e opțional, dar trebuie să fie valid dacă e completat", () => {
    expect(errs({ email: "ana@" }).email).toBeDefined();
    expect(errs({ email: "   " }).email).toBeUndefined();
  });
  it("serviciile doar informative nu se pot programa", () => {
    expect(errs({ service: "traduceri-legalizate" }).service).toBeDefined();
  });
  it("ziua: azi e permisă, ieri nu; duminica nu; maximum 90 de zile", () => {
    expect(errs({ day: "2026-11-02" }).day).toBeUndefined();
    expect(errs({ day: "2026-11-01" }).day).toMatch(/azi/);
    expect(errs({ day: "2026-11-08" }).day).toMatch(/Duminica/);
    expect(errs({ day: "2027-01-30" }).day).toBeUndefined(); // sâmbătă, ziua 89
    expect(errs({ day: "2027-01-31" }).day).toMatch(/Duminica/); // ziua 90
    expect(errs({ day: "2027-02-01" }).day).toMatch(/90/);
    expect(errs({ day: "2026-02-30" }).day).toMatch(/validă/);
    expect(errs({ day: "3 nov" }).day).toMatch(/validă/);
  });
  it("lungimea mesajului", () => {
    expect(errs({ message: "a".repeat(1000) }).message).toBeUndefined();
    expect(errs({ message: "a".repeat(1001) }).message).toBeDefined();
  });
  it("isoDay folosește data locală", () => {
    expect(isoDay(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
  });
});
