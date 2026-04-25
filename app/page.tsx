import { Hero } from "./components/Hero";
import { SearchEngine } from "./components/SearchEngine";
import { AiCareAgent } from "./components/AiCareAgent";
import { Sectors } from "./components/Sectors";
import { Locations } from "./components/Locations";
import { Programs } from "./components/Programs";
import { Doctors } from "./components/Doctors";
import { HomeHealthcare } from "./components/HomeHealthcare";
import { Telemedicine } from "./components/Telemedicine";
import { Testimonials } from "./components/Testimonials";
import { AppCTA } from "./components/AppCTA";
import { AppointmentForm } from "./components/AppointmentForm";
import { News } from "./components/News";
import { Reveal } from "./components/ui";

export default function Home() {
  return (
    <main className="homepage">
      <Hero />
      <SearchEngine />
      <AiCareAgent />
      <Reveal><Sectors /></Reveal>
      <Reveal><Locations /></Reveal>
      <Reveal><Programs /></Reveal>
      <Reveal><Doctors /></Reveal>
      <Reveal><HomeHealthcare /></Reveal>
      <Reveal><Telemedicine /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><AppCTA /></Reveal>
      <Reveal><AppointmentForm /></Reveal>
      <Reveal><News /></Reveal>
    </main>
  );
}
