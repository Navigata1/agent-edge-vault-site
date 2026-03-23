import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import HowItWorks from "./components/HowItWorks";
import DataSources from "./components/DataSources";
import ApiSection from "./components/ApiSection";
import EarlyAccess from "./components/EarlyAccess";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-noise">
      {/* Global grid background */}
      <div className="fixed inset-0 bg-grid opacity-100 pointer-events-none z-0" />

      {/* Content layers */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Capabilities />
        <HowItWorks />
        <DataSources />
        <ApiSection />
        <EarlyAccess />
        <Footer />
      </div>
    </main>
  );
}
