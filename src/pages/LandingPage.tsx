import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Gallery from "../components/Gallery";
import ProductPreview from "../components/ProductPreview";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Gallery />
        <ProductPreview />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}