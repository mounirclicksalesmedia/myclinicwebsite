import type { Metadata } from "next";
import { AuthForm } from "../components/AuthForm";

export const metadata: Metadata = {
  title: "Create account — MyClinic",
  description:
    "Create your MyClinic account to book appointments, store your medical history, join telemedicine visits, and unlock app-only programs.",
};

export default function RegisterRoute() {
  return (
    <main>
      <AuthForm mode="register" />
    </main>
  );
}
