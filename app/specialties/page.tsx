import type { Metadata } from "next";
import {
  SpecialtiesHero,
  FeaturedSpecialties,
  SpecialtiesGrid,
  CareJourney,
  SpecCTA,
} from "../components/Specialties";

export const metadata: Metadata = {
  title: "Our Specialties — MyClinic",
  description:
    "Browse 42 medical specialties at MyClinic — from cardiology and neurology to dental, pediatrics, oncology and more. One connected medical home across the Kingdom.",
};

export default function SpecialtiesPage() {
  return (
    <main>
      <SpecialtiesHero />
      <FeaturedSpecialties />
      <SpecialtiesGrid />
      <CareJourney />
      <SpecCTA />
    </main>
  );
}
