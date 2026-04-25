import type { Metadata } from "next";
import { DoctorDetailsHero } from "../../components/DoctorDetailsHero";
import { DoctorDetailsBody } from "../../components/DoctorDetailsBody";
import { RelatedDoctors } from "../../components/RelatedDoctors";

const DOCTOR_META = {
  name: "Dr. Haifa Al-Falah",
  spec: "Cardiology",
  title: "Senior Consultant & Head of Department",
  branch: "MyClinic Olaya — Flagship",
  exp: 18,
  sub: "Interventional Cardiology",
};

export const metadata: Metadata = {
  title: `${DOCTOR_META.name} — ${DOCTOR_META.spec} · MyClinic`,
  description: `${DOCTOR_META.title} at ${DOCTOR_META.branch}. ${DOCTOR_META.exp} years experience in ${DOCTOR_META.sub}. Book an in-person or video consultation.`,
};

export default function DoctorDetailsPage() {
  return (
    <main>
      <DoctorDetailsHero />
      <DoctorDetailsBody />
      <RelatedDoctors />
    </main>
  );
}
