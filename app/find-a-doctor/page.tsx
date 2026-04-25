import type { Metadata } from "next";
import { FindDoctorHero } from "../components/FindDoctorHero";
import { FindDoctorAssistant } from "../components/FindDoctorAssistant";
import { FindDoctorResults } from "../components/FindDoctorResults";

export const metadata: Metadata = {
  title: "Find a Doctor — MyClinic",
  description:
    "Search MyClinic's 850+ consultants across 40+ specialties. Filter by city, insurance, language, and availability — book in seconds.",
};

export default function FindADoctorPage() {
  return (
    <main>
      <FindDoctorHero />
      <FindDoctorAssistant />
      <FindDoctorResults />
    </main>
  );
}
