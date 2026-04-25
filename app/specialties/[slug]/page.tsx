import type { Metadata } from "next";
import { SpecialtyDetail } from "../../components/SpecialtyDetail";

export const metadata: Metadata = {
  title: "Cardiology — Heart & Vascular Center · MyClinic",
  description:
    "MyClinic's Heart & Vascular Center — 42 consultants, 18k+ procedures a year, JCI accredited. Interventional, electrophysiology, imaging, preventive and surgical cardiology under one roof.",
};

export default function SpecialtyDetailPage() {
  return (
    <main>
      <SpecialtyDetail />
    </main>
  );
}
