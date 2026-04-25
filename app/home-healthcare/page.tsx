import type { Metadata } from "next";
import { HomeHealthcarePage } from "../components/HomeHealthcarePage";

export const metadata: Metadata = {
  title: "Home Healthcare — Hospital-grade care at your door · MyClinic",
  description:
    "Licensed physiotherapists, physicians and nurses delivering hospital-grade care at home across 10 cities in Saudi Arabia. Covered by most insurers.",
};

export default function HomeHealthcareRoute() {
  return (
    <main dir="ltr">
      <HomeHealthcarePage />
    </main>
  );
}
