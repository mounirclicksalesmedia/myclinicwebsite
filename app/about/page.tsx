import type { Metadata } from "next";
import { AboutPage } from "../components/AboutPage";

export const metadata: Metadata = {
  title: "About Us — MyClinic",
  description:
    "MyClinic is a medical group rooted in Jeddah and Riyadh — 14 branches, 850+ consultants, one connected medical record. JCI accredited since 2012.",
};

export default function AboutRoute() {
  return (
    <main>
      <AboutPage />
    </main>
  );
}
