/** Pașii unei proceduri notariale obișnuite (de exemplu, o vânzare). Text general. */
import type { IconName } from "@/data/services";

export type ProcedureStep = {
  id: string;
  title: string;
  icon: IconName | "calendar";
  text: string;
  you: string;
  time: string;
};

export const procedure: ProcedureStep[] = [
  {
    id: "programare",
    title: "Programare",
    icon: "calendar",
    text: "Ne sunați sau completați formularul online. Ne spuneți pe scurt ce act doriți și cine participă.",
    you: "Pregătiți o descriere scurtă a situației și datele de contact.",
    time: "câteva minute",
  },
  {
    id: "documente",
    title: "Documente",
    icon: "document",
    text: "Vă trimitem lista de acte potrivită situației. Verificăm documentele primite și solicităm extrasele necesare.",
    you: "Strângeți actele de pe listă; ni le puteți trimite dinainte, în copie.",
    time: "1–3 zile lucrătoare, de obicei",
  },
  {
    id: "redactare",
    title: "Redactare",
    icon: "quill",
    text: "Redactăm actul pe baza documentelor. La cerere, vă trimitem proiectul ca să-l citiți în liniște.",
    you: "Citiți proiectul și ne spuneți dacă ceva nu corespunde.",
    time: "în funcție de act",
  },
  {
    id: "semnare",
    title: "Semnare",
    icon: "stamp",
    text: "La birou, notarul verifică identitatea părților, citește actul împreună cu dumneavoastră și răspunde la întrebări.",
    you: "Veniți cu actele de identitate în original. Semnați doar când totul este clar.",
    time: "30–60 de minute",
  },
  {
    id: "eliberare",
    title: "Eliberare",
    icon: "seal",
    text: "Primiți exemplarele actului. Unde este cazul, ne ocupăm și de înscrierea în cartea funciară.",
    you: "Păstrați actul original într-un loc sigur.",
    time: "pe loc sau în câteva zile",
  },
];
