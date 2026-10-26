/** Echipa biroului. Persoane FICTIVE, reprezentate prin ilustrații, nu fotografii. */

export type Figure = "notary" | "deputy" | "clerk-a" | "clerk-b" | "clerk-c";

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  /** O frază despre persoană. */
  bio: string;
  specialties: string[];
  figure: Figure;
  /** Apare și pe pagina Acasă. */
  lead?: boolean;
};

export const staff: StaffMember[] = [
  {
    id: "notar",
    name: "Victoria Arsene",
    role: "Notar public",
    bio: "Coordonează biroul și semnează actele autentice. Are obiceiul de a citi cu voce tare fiecare contract, înainte de semnare.",
    specialties: ["Vânzări și ipoteci", "Succesiuni", "Testamente"],
    figure: "notary",
    lead: true,
  },
  {
    id: "notar-asociat",
    name: "Mihai Stoenescu",
    role: "Notar public asociat",
    bio: "Preia dosarele de succesiune și actele pentru firme. Răspunde la întrebările care încep cu „dar dacă…”.",
    specialties: ["Dezbateri succesorale", "Acte pentru firme", "Partaje"],
    figure: "deputy",
    lead: true,
  },
  {
    id: "secretariat",
    name: "Corina Matei",
    role: "Secretar și programări",
    bio: "Prima voce pe care o auziți la telefon. Vă spune ce acte să aduceți și când este cel mai liniștit la birou.",
    specialties: ["Programări", "Liste de documente", "Legalizări"],
    figure: "clerk-a",
  },
  {
    id: "referent-cf",
    name: "Radu Ilie",
    role: "Referent, carte funciară",
    bio: "Se ocupă de extrasele de carte funciară și de înscrierea actelor după semnare.",
    specialties: ["Carte funciară", "Documentație cadastrală", "Arhivă"],
    figure: "clerk-b",
  },
  {
    id: "referent-redactare",
    name: "Simona Toma",
    role: "Referent, redactare acte",
    bio: "Pregătește proiectele de contract și verifică, rând cu rând, datele din acte.",
    specialties: ["Redactare", "Procuri și declarații", "Contracte auto"],
    figure: "clerk-c",
  },
];
