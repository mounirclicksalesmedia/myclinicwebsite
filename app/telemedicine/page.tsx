import type { Metadata } from "next";
import { TelemedicinePage } from "../components/TelemedicinePage";

export const metadata: Metadata = {
  title: "Telemedicine — See a doctor in minutes · MyClinic",
  description:
    "Secure video consultations with 200+ MyClinic consultants across 28 specialties. Digital prescriptions, medication delivery and at-home labs — all from one app.",
};

export default function TelemedicineRoute() {
  return (
    <main>
      <TelemedicinePage />
    </main>
  );
}
