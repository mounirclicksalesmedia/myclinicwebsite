import type { Metadata } from "next";
import { AuthForm } from "../components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in — MyClinic",
  description:
    "Sign in to your MyClinic account to manage appointments, view records, message your care team, and join telemedicine visits.",
};

export default function LoginRoute() {
  return (
    <main>
      <AuthForm mode="login" />
    </main>
  );
}
