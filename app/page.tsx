import { Eligibility, Vision } from "@/components/About";
import { Contact, Footer, References } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Roadmap from "@/components/Roadmap";
import SignupForm from "@/components/SignupForm";
import Team from "@/components/Team";
import Volunteer from "@/components/Volunteer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Vision />
        <Eligibility />
        <Roadmap />
        <SignupForm />
        <Team />
        <Volunteer />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
